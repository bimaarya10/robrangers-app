import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbManager } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("ranger_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Sesi tidak ditemukan atau kedaluwarsa." },
        { status: 401 }
      );
    }

    const chats = dbManager.getChatMessagesByUserId(sessionId);
    return NextResponse.json({ chats }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memuat riwayat percakapan." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("ranger_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Sesi tidak ditemukan atau kedaluwarsa." },
        { status: 401 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    // Save user's incoming message
    dbManager.createChatMessage(sessionId, "user", prompt);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Direct call to Gemini API using native fetch
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          systemInstruction: {
            parts: [
              {
                text: "Anda adalah Robby, asisten mentor virtual AI pemrograman Roblox Studio dan bahasa Lua yang ramah, asyik, dan bersemangat. Jawablah pertanyaan user dengan profesional dan memotivasi, gunakan bahasa Indonesia yang santai tapi edukatif. Selalu berikan tips pembelajaran praktis, penjelasan singkat, dan contoh script Lua yang terformat rapi (dalam markdown code blocks) jika ditanyakan atau relevan dengan penjelasan Anda."
              }
            ]
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          // Save AI's response
          dbManager.createChatMessage(sessionId, "ai", text);
          return NextResponse.json({ reply: text });
        }
      }
      
      console.warn("Gemini API call failed, falling back to local engine");
    }

    // LOCAL RULE-BASED MATCHING ENGINE (Fallback / Offline mode)
    const lowerPrompt = prompt.toLowerCase();
    let reply = "";

    if (lowerPrompt.includes("obby") || lowerPrompt.includes("platform") || lowerPrompt.includes("bergerak")) {
      reply = `Untuk membuat platform bergerak di game Obby Roblox Studio, Anda dapat memanfaatkan metode \`Lerp\` (Linear Interpolation) di dalam loop script server.

Letakkan Script di bawah Part platform Anda, lalu tulis kode ini:

\`\`\`lua
local platform = script.Parent
local startPos = platform.Position
local targetPos = startPos + Vector3.new(0, 0, 15) -- Bergerak sejauh 15 studs
local speed = 0.05 -- Kecepatan pergerakan

while true do
    -- Bergerak menuju target
    for t = 0, 1, speed do
        platform.Position = startPos:Lerp(targetPos, t)
        task.wait(0.03)
    end
    task.wait(1) -- Jeda di lokasi tujuan
    
    -- Bergerak kembali ke awal
    for t = 0, 1, speed do
        platform.Position = targetPos:Lerp(startPos, t)
        task.wait(0.03)
    end
    task.wait(1) -- Jeda sebelum berulang
end
\`\`\`

💡 **Tips Ranger**: Gunakan \`task.wait()\` daripada \`wait()\` biasa di Roblox Studio modern. \`task.wait()\` terintegrasi dengan scheduler terbaru dan tidak memicu delay lag di server!`;
    } else if (lowerPrompt.includes("remoteevent") || lowerPrompt.includes("client-server") || lowerPrompt.includes("networking") || lowerPrompt.includes("replicatedstorage")) {
      reply = `**RemoteEvent** adalah cara utama menjembatani komunikasi satu arah antara **Client** (LocalScript di perangkat pemain) dan **Server** (Script di server Roblox).

Berikut adalah langkah-langkah menyusunnya:

1. Buat **RemoteEvent** baru di dalam folder \`ReplicatedStorage\` dan beri nama \`MyEvent\`.
2. Kirim sinyal dari **Client** (tulis ini di \`LocalScript\` di StarterPlayer/StarterGui):
\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local myEvent = ReplicatedStorage:WaitForChild("MyEvent")

-- Memicu server dan mengirim data pesan
myEvent:FireServer("Halo dari client!")
\`\`\`
3. Terima sinyal di **Server** (tulis ini di \`Script\` biasa di ServerScriptService):
\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local myEvent = ReplicatedStorage:WaitForChild("MyEvent")

myEvent.OnServerEvent:Connect(function(player, message)
    print(player.Name .. " mengirim pesan: " .. message)
end)
\`\`\`

💡 **Tips Ranger**: Jangan letakkan data sensitif seperti harga koin atau status admin langsung dari Client ke Server. Pastikan Server selalu memverifikasi ulang logika belanja/status pemain!`;
    } else if (lowerPrompt.includes("touched") || lowerPrompt.includes("sensor") || lowerPrompt.includes("sentuh") || lowerPrompt.includes("pintu") || lowerPrompt.includes("lava")) {
      reply = `Mendeteksi sentuhan pada Part menggunakan event \`.Touched\` sangat berguna untuk membuat jebakan, pintu otomatis, atau tombol interaktif.

Berikut contoh script jebakan lava (menghilangkan nyawa pemain saat disentuh):

\`\`\`lua
local lava = script.Parent
local debounce = false -- Menghindari pemanggilan fungsi berkali-kali

local function onTouched(hit)
    local character = hit.Parent
    -- Mencari apakah part yang menyentuh memiliki Humanoid (yaitu karakter pemain)
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    
    if humanoid and not debounce then
        debounce = true
        humanoid.Health = 0 -- Mengeliminasi pemain
        task.wait(1)        -- Jeda 1 detik agar debounce reset
        debounce = false
    end
end

lava.Touched:Connect(onTouched)
\`\`\`

💡 **Tips Ranger**: Variabel \`debounce\` di atas sangat krusial! Tanpa debounce, event \`.Touched\` akan dipanggil puluhan kali per detik saat pemain berjalan di atas part, yang dapat membuat server lag hebat.`;
    } else if (lowerPrompt.includes("leaderboard") || lowerPrompt.includes("score") || lowerPrompt.includes("coin") || lowerPrompt.includes("koin") || lowerPrompt.includes("nilai")) {
      reply = `Untuk membuat daftar papan nilai (Leaderboard) yang melacak koin atau poin pemain, Anda harus membuat folder khusus bernama \`leaderstats\` di dalam objek pemain ketika mereka masuk game.

Letakkan Script biasa di bawah folder \`ServerScriptService\`:

\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    -- 1. Buat folder leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- 2. Buat nilai Koin
    local coins = Instance.new("IntValue")
    coins.Name = "Koin"
    coins.Value = 0 -- Nilai awal koin
    coins.Parent = leaderstats
end)
\`\`\`

💡 **Tips Ranger**: Ejaan nama folder harus persis \`leaderstats\` dengan huruf kecil penuh. Roblox Studio secara otomatis mendeteksi folder ini untuk dirender menjadi UI papan peringkat di pojok kanan atas layar!`;
    } else if (lowerPrompt.includes("loop") || lowerPrompt.includes("perulangan") || lowerPrompt.includes("while") || lowerPrompt.includes("for")) {
      reply = `Di Lua Roblox, ada 3 jenis perulangan (loop) utama yang sering digunakan:

1. **While Loop** (Sering digunakan untuk script yang terus-menerus berjalan):
\`\`\`lua
while true do
    print("Menghitung...")
    task.wait(1) -- WAJIB memberikan jeda agar game tidak freeze/crash!
end
\`\`\`

2. **For Loop** (Perulangan dengan batas angka yang ditentukan):
\`\`\`lua
-- Berhitung dari 1 sampai 5
for i = 1, 5 do
    print("Angka ke-" .. i)
    task.wait(0.5)
end
\`\`\`

3. **Generic For Loop** (Mengiterasi pasangan tabel, seperti melacak daftar anak part):
\`\`\`lua
local folder = workspace.MyParts
for index, child in ipairs(folder:GetChildren()) do
    if child:IsA("BasePart") then
        child.Color = Color3.fromRGB(0, 255, 0) -- Mengubah warna semua part menjadi hijau
    end
end
\`\`\`

💡 **Tips Ranger**: Pastikan perulangan \`while\` atau \`repeat\` Anda memiliki \`task.wait()\` di dalamnya. Tanpa jeda, perulangan akan berjalan tanpa batas dalam satu frame dan menyebabkan Roblox Studio hang!`;
    } else {
      reply = `Halo Ranger! Pertanyaan yang bagus sekali. Di Roblox Studio, pemrograman Lua diatur dengan struktur object-oriented yang mudah dipelajari.

Berikut adalah 3 aturan penting saat menulis script di Roblox:
1. **Case-Sensitive**: Huruf kapital dan kecil sangat berpengaruh (misalnya \`local\` berbeda dengan \`Local\`, dan \`Workspace\` berbeda dengan \`workspace\`).
2. **Variabel Lokal**: Selalu deklarasikan variabel dengan keyword \`local\` (contoh: \`local koin = 10\`) untuk menghemat memori server.
3. **Cek Output Window**: Selalu buka menu **View > Output** di Roblox Studio untuk melihat baris kode mana yang mengalami error.

Apakah ada bagian script atau error spesifik yang sedang kamu hadapi dan ingin kita perbaiki bersama?`;
    }

    // Save AI's fallback reply
    dbManager.createChatMessage(sessionId, "ai", reply);

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat memproses AI chat." },
      { status: 500 }
    );
  }
}
