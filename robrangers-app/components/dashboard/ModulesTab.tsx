"use client";

import React, { useState, useEffect } from "react";
import { motion as motionImported, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Volume2, 
  Maximize, 
  Award, 
  Lock, 
  Check, 
  ChevronRight, 
  FileText, 
  HelpCircle, 
  Code,
  ArrowLeft
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Module {
  id: number;
  title: string;
  level: string;
  duration: string;
  desc: string;
}

interface ModuleContent {
  textTitle: string;
  textContent: React.ReactNode;
  quizQuestion: string;
  quizOptions: string[];
  quizCorrectIndex: number;
  quizCorrectFeedback: string;
  quizIncorrectFeedback: string;
  challengeTitle: string;
  challengeDesc: string;
  challengeCode: string;
}

const MODULE_CONTENTS: Record<number, ModuleContent> = {
  0: {
    textTitle: "Pembahasan Luau (Roblox Lua)",
    textContent: (
      <>
        <p>
          Roblox menggunakan bahasa pemrograman bernama <strong>Luau</strong>, yang merupakan turunan (derivative) dari Lua 5.1 yang dioptimalkan untuk performa tinggi dan pengetikan statis opsional.
        </p>
        <p>
          Luau dirancang agar sangat cepat dan aman dijalankan di server maupun perangkat mobile pemain. Semua skrip dieksekusi di dalam lingkungan terisolasi (sandbox) demi keamanan game.
        </p>
      </>
    ),
    quizQuestion: "Bahasa pemrograman apakah yang digunakan untuk memprogram game di Roblox?",
    quizOptions: ["JavaScript", "Luau (Roblox Lua)", "Python", "C#"],
    quizCorrectIndex: 1,
    quizCorrectFeedback: "Benar sekali! Luau adalah bahasa scripting resmi Roblox.",
    quizIncorrectFeedback: "Kurang tepat. Roblox menggunakan bahasa pemrograman Luau.",
    challengeTitle: "Mengenal Luau",
    challengeDesc: "Buka Roblox Studio, buat Script baru di Workspace, lalu tulis pesan sambutan di dalamnya.",
    challengeCode: "-- Tulis skrip pertama Anda di sini"
  },
  1: {
    textTitle: "Fungsi Print & Output di Roblox Studio",
    textContent: (
      <>
        <p>
          Perintah bawaan terpenting untuk komunikasi skrip adalah <code>print()</code>. Fungsi ini berguna untuk menulis log teks ke panel Output.
        </p>
        <p>
          Apapun nilai yang diletakkan di dalam tanda kurung akan diproyeksikan langsung pada panel <strong>Output Window</strong> di Roblox Studio.
        </p>
      </>
    ),
    quizQuestion: "Fungsi manakah yang digunakan untuk mencetak log ke output di Roblox Studio?",
    quizOptions: ["print()", "console.log()", "System.out.println()", "output.write()"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Luar biasa! Benar sekali. print() adalah fungsi bawaan Lua untuk mencetak pesan.",
    quizIncorrectFeedback: "Kurang tepat. Coba perhatikan fungsi standar Lua untuk printing.",
    challengeTitle: "Mencetak Angka",
    challengeDesc: "Gunakan print() untuk mencetak hasil penjumlahan 5 + 10 ke panel output.",
    challengeCode: "print(5 + 10)"
  },
  2: {
    textTitle: "Variabel Lokal dan Variabel Global",
    textContent: (
      <>
        <p>
          Variabel digunakan untuk menyimpan data. Di Lua, Anda dapat membuat variabel lokal menggunakan keyword <code>local</code>.
        </p>
        <p>
          Selalu gunakan <code>local</code> untuk mendeklarasikan variabel agar skrip berjalan lebih cepat dan tidak mencemari lingkungan global memori server.
        </p>
      </>
    ),
    quizQuestion: "Keyword apakah yang direkomendasikan untuk membuat variabel di Roblox agar efisien?",
    quizOptions: ["var", "let", "local", "global"],
    quizCorrectIndex: 2,
    quizCorrectFeedback: "Benar! local membatasi cakupan variabel dan menghemat memori.",
    quizIncorrectFeedback: "Kurang tepat. Gunakan local untuk efisiensi variabel di Roblox.",
    challengeTitle: "Mendeklarasikan Variabel",
    challengeDesc: "Buat variabel lokal bernama 'namaPemain' dan isi dengan teks nama Anda.",
    challengeCode: "local namaPemain = \"Ranger\""
  },
  3: {
    textTitle: "Percabangan Logika: If-Else Statements",
    textContent: (
      <>
        <p>
          Pernyataan <code>if</code> digunakan untuk memeriksa suatu kondisi. Jika kondisi bernilai <code>true</code>, maka kode di dalam blok akan dijalankan.
        </p>
        <p>
          Gunakan <code>elseif</code> untuk mengecek kondisi tambahan, dan <code>else</code> jika semua kondisi sebelumnya bernilai salah.
        </p>
      </>
    ),
    quizQuestion: "Untuk menutup blok pernyataan 'if' di Lua, kata kunci apa yang wajib ditulis?",
    quizOptions: ["end", "stop", "}", "endif"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Tepat! Di Lua, setiap blok if, function, dan loop ditutup dengan kata kunci 'end'.",
    quizIncorrectFeedback: "Kurang tepat. Ingat bahwa Lua menggunakan 'end' untuk menutup blok kode.",
    challengeTitle: "Logika Kelulusan",
    challengeDesc: "Tulis if statement untuk mencetak 'Lolos' jika variabel skor lebih besar atau sama dengan 80.",
    challengeCode: "local skor = 85\nif skor >= 80 then\n    print(\"Lolos\")\nend"
  },
  4: {
    textTitle: "Fungsi Dasar dan Passing Data",
    textContent: (
      <>
        <p>
          Fungsi (function) adalah kumpulan kode yang dapat dipanggil berkali-kali. Fungsi dapat menerima input berupa parameter (passing data) dan mengembalikan nilai dengan kata kunci <code>return</code>.
        </p>
      </>
    ),
    quizQuestion: "Bagaimana cara mendefinisikan fungsi tanpa nama (anonymous function) di Lua?",
    quizOptions: ["function() end", "() => {}", "def():", "sub()"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Benar sekali! function() end sering digunakan sebagai callback event.",
    quizIncorrectFeedback: "Kurang tepat. Lua menggunakan sintaks function() end untuk fungsi anonim.",
    challengeTitle: "Membuat Fungsi Tambah",
    challengeDesc: "Buat fungsi bernama 'tambah' yang menerima dua parameter a dan b, lalu mengembalikan nilai a + b.",
    challengeCode: "local function tambah(a, b)\n    return a + b\nend"
  },
  5: {
    textTitle: "Struktur Data: Arrays & Dictionaries",
    textContent: (
      <>
        <p>
          Tabel di Lua dapat bertindak sebagai <strong>Array</strong> (list berindeks angka dimulai dari 1) atau <strong>Dictionary</strong> (berisi pasangan key-value).
        </p>
        <p>
          Penting: Indeks array di Lua dimulai dari angka **1**, bukan 0 seperti bahasa pemrograman lainnya!
        </p>
      </>
    ),
    quizQuestion: "Berapakah indeks elemen pertama pada Array di pemrograman Lua?",
    quizOptions: ["0", "1", "-1", "Tergantung tipe"],
    quizCorrectIndex: 1,
    quizCorrectFeedback: "Benar! Berbeda dengan JS/Python, indeks array di Lua dimulai dari angka 1.",
    quizIncorrectFeedback: "Salah. Indeks pertama di Lua dimulai dari angka 1.",
    challengeTitle: "Membuat List Senjata",
    challengeDesc: "Buat array berisi daftar nama senjata: 'Pedang', 'Pistol', 'Tameng'.",
    challengeCode: "local senjata = {\"Pedang\", \"Pistol\", \"Tameng\"}"
  },
  6: {
    textTitle: "Perulangan While Loop",
    textContent: (
      <>
        <p>
          Perulangan <code>while</code> terus berjalan selama kondisinya benar. Wajib sertakan jeda seperti <code>task.wait()</code> di dalam loop agar game tidak crash!
        </p>
      </>
    ),
    quizQuestion: "Mengapa task.wait() wajib diletakkan di dalam perulangan while true do?",
    quizOptions: ["Agar program tidak crash/hang", "Hanya formalitas", "Agar skrip berwarna biru", "Membatasi memori disk"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Betul! Tanpa task.wait(), loop berjalan tanpa batas dalam 1 frame dan membuat game crash.",
    quizIncorrectFeedback: "Salah. task.wait() mengistirahatkan eksekusi skrip agar game tidak crash.",
    challengeTitle: "Loop Tak Terbatas yang Aman",
    challengeDesc: "Buat while true loop yang mencetak 'Menghitung...' setiap 1 detik.",
    challengeCode: "while true do\n    print(\"Menghitung...\")\n    task.wait(1)\nend"
  },
  7: {
    textTitle: "Perulangan For Loop",
    textContent: (
      <>
        <p>
          Pernyataan <code>for</code> digunakan untuk mengulang kode dengan rentang nilai tertentu (numerik) atau menggunakan iterator pada tabel.
        </p>
      </>
    ),
    quizQuestion: "Sintaks manakah yang benar untuk melakukan loop angka dari 1 sampai 5 di Lua?",
    quizOptions: ["for i = 1, 5 do end", "for (i=1; i<=5; i++)", "for i in range(1, 5):", "foreach i from 1 to 5"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Tepat! Sintaks numerik for di Lua adalah: for i = start, end, step do end.",
    quizIncorrectFeedback: "Kurang tepat. Lua menggunakan struktur for i = start, end do end.",
    challengeTitle: "Mencetak Angka 1-5",
    challengeDesc: "Gunakan for loop untuk mencetak angka dari 1 hingga 5.",
    challengeCode: "for i = 1, 5 do\n    print(i)\nend"
  },
  8: {
    textTitle: "Mengakses Part: Instance Indexing",
    textContent: (
      <>
        <p>
          Di Roblox Studio, semua objek di Workspace disebut <strong>Instance</strong>. Anda dapat mengakses part dengan menelusuri hierarkinya menggunakan titik (.).
        </p>
      </>
    ),
    quizQuestion: "Bagaimana cara mengakses part bernama 'Lantai' yang berada langsung di dalam Workspace?",
    quizOptions: ["game.Workspace.Lantai", "workspace:GetPart('Lantai')", "Lantai.Parent", "game:Find('Lantai')"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Benar! game.Workspace.Lantai (atau workspace.Lantai) mengacu pada objek part tersebut.",
    quizIncorrectFeedback: "Salah. Kita menelusuri hierarki objek menggunakan titik (.), contoh: game.Workspace.Lantai.",
    challengeTitle: "Mengubah Warna Lantai",
    challengeDesc: "Akses part Lantai di Workspace dan ubah warna part tersebut menjadi merah.",
    challengeCode: "game.Workspace.Lantai.Color = Color3.fromRGB(255, 0, 0)"
  },
  9: {
    textTitle: "Dasar Manipulasi Instance",
    textContent: (
      <>
        <p>
          Anda dapat memanipulasi properti dari objek seperti posisi, warna, transparansi, ukuran, dan jangkar (Anchored) langsung melalui kode Lua.
        </p>
      </>
    ),
    quizQuestion: "Properti apakah yang digunakan untuk membuat part melayang dan tidak jatuh karena gravitasi?",
    quizOptions: ["Anchored", "Transparency", "CanCollide", "Position"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Hebat! Anchored = true mengunci part agar melayang di udara.",
    quizIncorrectFeedback: "Salah. Properti Anchored mengunci pergerakan fisik objek agar melayang.",
    challengeTitle: "Mengunci Part",
    challengeDesc: "Set properti Anchored dari part platform di Workspace menjadi true.",
    challengeCode: "game.Workspace.Platform.Anchored = true"
  },
  10: {
    textTitle: "Event & Callback Instance",
    textContent: (
      <>
        <p>
          Event adalah sinyal yang dipicu ketika terjadi sesuatu, misalnya part disentuh (.Touched) atau pemain bergabung (.PlayerAdded). Kita menghubungkan event dengan fungsi menggunakan <code>:Connect()</code>.
        </p>
      </>
    ),
    quizQuestion: "Metode apa yang digunakan untuk menghubungkan Event dengan fungsi callback?",
    quizOptions: [":Connect()", ":Bind()", ":Trigger()", ":Listen()"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Benar sekali! Kita menggunakan :Connect() untuk mendengarkan event sinyal.",
    quizIncorrectFeedback: "Salah. Gunakan titik dua dan kata Connect, yaitu :Connect(fungsi).",
    challengeTitle: "Sensor Sentuhan",
    challengeDesc: "Hubungkan event Touched dari part platform ke sebuah fungsi anonim.",
    challengeCode: "game.Workspace.Platform.Touched:Connect(function(hit)\n    print(\"Disentuh oleh \" .. hit.Name)\nend)"
  },
  11: {
    textTitle: "Perkenalan Instance Lebih Dalam",
    textContent: (
      <>
        <p>
          Kita dapat membuat objek baru secara dinamis menggunakan <code>Instance.new(\"NamaClass\")</code>, dan menghancurkannya menggunakan properti <code>:Destroy()</code>.
        </p>
      </>
    ),
    quizQuestion: "Metode apakah yang digunakan untuk menghapus objek secara permanen dari game?",
    quizOptions: [":Destroy()", ":Remove()", ":Delete()", ":Kill()"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Benar! :Destroy() memutuskan koneksi event dan menghapus objek dari memori.",
    quizIncorrectFeedback: "Kurang tepat. Gunakan :Destroy() untuk menghapus instance secara bersih.",
    challengeTitle: "Membuat Objek Baru",
    challengeDesc: "Buat part baru secara dinamis dan letakkan di dalam Workspace.",
    challengeCode: "local part_baru = Instance.new(\"Part\")\npart_baru.Parent = workspace"
  },
  12: {
    textTitle: "Penyimpanan Data: DataStoreService",
    textContent: (
      <>
        <p>
          <strong>DataStoreService</strong> memungkinkan data pemain (seperti Level, XP, Koin) disimpan secara permanen di cloud Roblox sehingga tidak hilang saat pemain keluar game.
        </p>
      </>
    ),
    quizQuestion: "Service apakah yang digunakan untuk menyimpan data pemain secara persisten di cloud Roblox?",
    quizOptions: ["DataStoreService", "StorageService", "CloudService", "SaveService"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Luar biasa! DataStoreService adalah modul database bawaan cloud Roblox.",
    quizIncorrectFeedback: "Salah. Roblox menyediakan DataStoreService untuk penyimpanan awan.",
    challengeTitle: "Mengambil DataStore",
    challengeDesc: "Gunakan game:GetService untuk mendapatkan DataStoreService dan memanggil data store bernama 'DataKoin'.",
    challengeCode: "local DataStoreService = game:GetService(\"DataStoreService\")\nlocal koinStore = DataStoreService:GetDataStore(\"DataKoin\")"
  },
  13: {
    textTitle: "Roblox Services: game:GetService()",
    textContent: (
      <>
        <p>
          Roblox memiliki berbagai sistem internal penting bernama **Services** (seperti Players, ReplicatedStorage, TweenService). Cara terbaik dan teraman untuk mengakses service ini adalah menggunakan <code>game:GetService(\"NamaService\")</code>.
        </p>
      </>
    ),
    quizQuestion: "Mengapa menggunakan game:GetService('Name') lebih baik daripada langsung menulis game.Name?",
    quizOptions: ["Lebih aman dan otomatis membuat service jika belum terpasang", "Hanya gaya koding", "Menghasilkan performa 10x lipat lebih cepat", "Diwajibkan oleh compiler Lua asli"],
    quizCorrectIndex: 0,
    quizCorrectFeedback: "Tepat sekali! game:GetService() adalah best-practice resmi Roblox API.",
    quizIncorrectFeedback: "Kurang tepat. game:GetService() memastikan service ter-load dengan aman dan stabil.",
    challengeTitle: "Mengakses Players Service",
    challengeDesc: "Dapatkan Players Service menggunakan metode game:GetService().",
    challengeCode: "local Players = game:GetService(\"Players\")"
  }
};

export default function ModulesTab() {
  const { user, addXp } = useUser();
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);
  const [subTab, setSubTab] = useState("text");
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoConfigs, setVideoConfigs] = useState<any[]>([]);
  const [challengeCode, setChallengeCode] = useState("");
  const [challengeFeedback, setChallengeFeedback] = useState("");
  const [challengeError, setChallengeError] = useState(false);

  // Reset playing state on module switch
  useEffect(() => {
    setIsPlaying(false);
  }, [expandedModuleId]);

  // Fetch video configs on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/modules/videos");
        if (res.ok) {
          const data = await res.json();
          setVideoConfigs(data.videos);
        }
      } catch (err) {
        console.error("Gagal memuat video modul:", err);
      }
    };
    fetchVideos();
  }, []);

  // Sync completion states with database dynamically
  useEffect(() => {
    if (expandedModuleId !== null && user) {
      const content = MODULE_CONTENTS[expandedModuleId];
      if (content) {
        // Sync quiz status
        if (user.completedQuizzes.includes(expandedModuleId)) {
          setQuizSelected(content.quizCorrectIndex);
          setQuizFeedback(content.quizCorrectFeedback);
        } else {
          setQuizSelected(null);
          setQuizFeedback("");
        }

        // Sync challenge status
        if (user.completedChallenges.includes(expandedModuleId)) {
          setChallengeFeedback("Hebat! Anda telah memverifikasi dan menyelesaikan tantangan ini! 🎉");
          setChallengeError(false);
        } else {
          setChallengeFeedback("");
          setChallengeError(false);
        }
      }
    }
  }, [expandedModuleId, user]);

  const validateChallengeCode = (moduleId: number, code: string): { success: boolean; message: string } => {
    const normalized = code.replace(/\s+/g, "").toLowerCase();
    
    if (!code.trim()) {
      return { success: false, message: "Kode tidak boleh kosong!" };
    }

    switch (moduleId) {
      case 0:
        if (normalized.includes("print") || normalized.includes("--")) {
          return { success: true, message: "Validasi Berhasil! Anda telah memahami konsep Luau." };
        }
        return { success: false, message: "Coba tulis baris skrip atau komentar Luau (gunakan '--')." };
      case 1:
        if (normalized.includes("print(5+10)") || normalized.includes("print(15)")) {
          return { success: true, message: "Validasi Berhasil! print(5 + 10) atau print(15) dievaluasi dengan benar." };
        }
        return { success: false, message: "Kode harus menggunakan fungsi print() untuk mencetak 5 + 10." };
      case 2:
        if (normalized.includes("localnamapemain=") || normalized.includes("localnamapemain=\"") || normalized.includes("localnamapemain='")) {
          return { success: true, message: "Validasi Berhasil! Variabel lokal 'namaPemain' terdefinisi dengan benar." };
        }
        return { success: false, message: "Tulis deklarasi variabel lokal: local namaPemain = \"NAMA_ANDA\"" };
      case 3:
        if (normalized.includes("ifskor>=80then") && normalized.includes("end")) {
          return { success: true, message: "Validasi Berhasil! Percabangan logika if-then-end berfungsi dengan benar." };
        }
        return { success: false, message: "Pastikan Anda menulis 'if skor >= 80 then' dan ditutup dengan 'end'." };
      case 4:
        if (normalized.includes("functiontambah(a,b)") && normalized.includes("returna+b") && normalized.includes("end")) {
          return { success: true, message: "Validasi Berhasil! Fungsi penjumlahan 'tambah' dideklarasikan dengan benar." };
        }
        return { success: false, message: "Pastikan Anda mendeklarasikan 'function tambah(a, b)' dan mengembalikan nilai 'a + b'." };
      case 5:
        if (normalized.includes("localsenjata={") && (normalized.includes("pedang") || normalized.includes("pistol") || normalized.includes("tameng"))) {
          return { success: true, message: "Validasi Berhasil! Array 'senjata' telah diinisialisasi menggunakan tanda kurung kurawal." };
        }
        return { success: false, message: "Buat array dengan menyisipkan elemen dalam kurung kurawal: local senjata = {\"Pedang\", \"Pistol\", \"Tameng\"}" };
      case 6:
        if (normalized.includes("whiletruedo") && normalized.includes("task.wait") && normalized.includes("end")) {
          return { success: true, message: "Validasi Berhasil! Perulangan while loop aman dengan pemanggilan task.wait()." };
        }
        return { success: false, message: "Pastikan perulangan 'while true do' memanggil 'task.wait()' di dalamnya sebelum 'end'." };
      case 7:
        if (normalized.includes("fori=1,5do") && normalized.includes("end")) {
          return { success: true, message: "Validasi Berhasil! Perulangan numerik dari 1 ke 5 berjalan sempurna." };
        }
        return { success: false, message: "Gunakan format for loop Lua: 'for i = 1, 5 do' dan ditutup dengan 'end'." };
      case 8:
        if (normalized.includes("game.workspace.lantai.color") || normalized.includes("workspace.lantai.color")) {
          return { success: true, message: "Validasi Berhasil! Hierarki properti lantai diakses secara tepat." };
        }
        return { success: false, message: "Akses lantai di Workspace lewat properti Color: 'game.Workspace.Lantai.Color'" };
      case 9:
        if (normalized.includes("platform.anchored=true")) {
          return { success: true, message: "Validasi Berhasil! Properti Anchored telah diset ke true." };
        }
        return { success: false, message: "Atur properti platform Anchored menjadi true: 'Platform.Anchored = true'" };
      case 10:
        if (normalized.includes("platform.touched:connect(")) {
          return { success: true, message: "Validasi Berhasil! Callback event Touched terhubung ke pemanggilan Connect." };
        }
        return { success: false, message: "Gunakan event Touched dan tautkan fungsi lewat ':Connect(function)'." };
      case 11:
        if (normalized.includes("instance.new(\"part\")") || normalized.includes("instance.new('part')")) {
          return { success: true, message: "Validasi Berhasil! Objek Part baru dibuat secara dinamis menggunakan Instance.new." };
        }
        return { success: false, message: "Gunakan 'Instance.new(\"Part\")' untuk membuat objek part baru." };
      case 12:
        if (normalized.includes("getdatastore(\"datakoin\")") || normalized.includes("getdatastore('datakoin')")) {
          return { success: true, message: "Validasi Berhasil! Data store bernama 'DataKoin' terambil secara aman." };
        }
        return { success: false, message: "Ambil database koin menggunakan ':GetDataStore(\"DataKoin\")'." };
      case 13:
        if (normalized.includes("game:getservice(\"players\")") || normalized.includes("game:getservice('players')")) {
          return { success: true, message: "Validasi Berhasil! Players Service berhasil diakses melalui game:GetService." };
        }
        return { success: false, message: "Gunakan best-practice service retriever: game:GetService(\"Players\")" };
      default:
        return { success: true, message: "Tantangan selesai diproses." };
    }
  };

  const handleVerifyChallenge = async () => {
    const moduleId = expandedModuleId;
    if (moduleId === null) return;

    const result = validateChallengeCode(moduleId, challengeCode);
    if (result.success) {
      setChallengeError(false);
      setChallengeFeedback(result.message + " 🎉");
      
      // Award XP
      try {
        await addXp(150, `Menyelesaikan Tantangan Koding: ${MODULE_CONTENTS[moduleId]?.textTitle}`, undefined, moduleId);
      } catch (err) {
        console.error("Gagal menambahkan XP:", err);
      }
    } else {
      setChallengeError(true);
      setChallengeFeedback(result.message);
    }
  };

  const modules: Module[] = [
    { 
      id: 0, 
      title: "00. Pembahasan Lua(u) Roblox", 
      level: "Beginner", 
      duration: "2:45",
      desc: "Perkenalan dengan Luau, varian Lua berkecepatan tinggi yang dioptimalkan untuk Roblox." 
    },
    { 
      id: 1, 
      title: "01. Printing, Dan Jenis Data", 
      level: "Beginner", 
      duration: "7:56",
      desc: "Dasar mencetak pesan log ke output dan memahami tipe-tipe data dasar Lua." 
    },
    { 
      id: 2, 
      title: "02. Local Variable, Dan Global Variable", 
      level: "Beginner", 
      duration: "6:20",
      desc: "Mendeklarasikan variabel lokal dan global demi optimasi alokasi memori script." 
    },
    { 
      id: 3, 
      title: "03. If else Statements", 
      level: "Beginner", 
      duration: "7:26",
      desc: "Penerapan logika percabangan untuk mengontrol alur instruksi program." 
    },
    { 
      id: 4, 
      title: "04. Basic Functions, Dan Passing Data", 
      level: "Intermediate", 
      duration: "9:15",
      desc: "Membuat fungsi mandiri dengan parameter untuk memproses data input secara fleksibel." 
    },
    { 
      id: 5, 
      title: "05. Basic Array, Dan Dictionary", 
      level: "Intermediate", 
      duration: "12:24",
      desc: "Mempelajari manipulasi tabel, list array berindeks, dan kamus data key-value." 
    },
    { 
      id: 6, 
      title: "06. While Loop", 
      level: "Intermediate", 
      duration: "8:33",
      desc: "Membuat perulangan tak terbatas yang aman dengan debounce dan task.wait()." 
    },
    { 
      id: 7, 
      title: "07. For Loop", 
      level: "Intermediate", 
      duration: "14:14",
      desc: "Iterasi angka numerik dan pasangan tabel menggunakan loop berbatas." 
    },
    { 
      id: 8, 
      title: "08. Instance Indexing", 
      level: "Intermediate", 
      duration: "17:31",
      desc: "Menelusuri hierarki Workspace untuk mendeteksi dan menargetkan objek Game Part." 
    },
    { 
      id: 9, 
      title: "09. Modifikasi Instance", 
      level: "Intermediate", 
      duration: "8:45",
      desc: "Mengubah properti fisik Part seperti warna, posisi, dan transparansi." 
    },
    { 
      id: 10, 
      title: "10. Tipe Data Primitif", 
      level: "Intermediate", 
      duration: "10:17",
      desc: "Mempelajari tipe data primitif bawaan di Roblox Lua untuk validasi variabel." 
    },
    { 
      id: 11, 
      title: "11. Perkenalan Instance Lebih Dalam", 
      level: "Advance", 
      duration: "8:57",
      desc: "Membuat instance objek part baru di Workspace secara dinamis dan menghancurkannya." 
    },
    { 
      id: 12, 
      title: "12. DataStoreService + Secret Module", 
      level: "Advance", 
      duration: "21:54",
      desc: "Menyimpan stats level, koin, dan progres pemain secara permanen di cloud Roblox." 
    },
    { 
      id: 13, 
      title: "13. game:GetService()", 
      level: "Advance", 
      duration: "4:05",
      desc: "Mengakses service inti Roblox secara aman menggunakan best-practice GetService." 
    }
  ];

  const handleAnswerSubmit = (optionIndex: number) => {
    const moduleId = expandedModuleId ?? 0;
    const content = MODULE_CONTENTS[moduleId];
    if (!content) return;

    setQuizSelected(optionIndex);
    if (optionIndex === content.quizCorrectIndex) {
      setQuizFeedback(content.quizCorrectFeedback);
      addXp(100, `Menyelesaikan Kuis: ${content.textTitle}`, moduleId);
    } else {
      setQuizFeedback(content.quizIncorrectFeedback);
    }
  };

  // iOS Spring Configurations
  const iosSpring = {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8
  };

  const iosBouncy = {
    type: "spring" as const,
    stiffness: 400,
    damping: 18,
    mass: 0.6
  };

  const activeConfig = videoConfigs.find(v => v.id === (expandedModuleId !== null ? expandedModuleId : 0)) || videoConfigs[0];
  const activeVideoUrl = activeConfig ? activeConfig.videoUrl : "https://www.youtube.com/embed/CAUSzPsnOE0";
  const activeModuleTitle = activeConfig ? activeConfig.moduleTitle : "00. Pembahasan Lua(u) Roblox";
  const activeVideoDuration = activeConfig ? activeConfig.duration : "2:45";

  const totalTasks = 28;
  const completedTasksCount = (user?.completedQuizzes?.length ?? 0) + (user?.completedChallenges?.length ?? 0);
  const completionPercentage = Math.min(100, Math.round((completedTasksCount / totalTasks) * 100));
  const isRealCompleted = completionPercentage === 100;
  const isFinishedSyllabus = isCompleted || isRealCompleted;

  return (
    <div className="space-y-8 select-none">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">Modul & Materi</h1>
          <p className="text-xs text-[#86868B]">Pilih modul pembelajaran di bawah ini untuk memulai koding.</p>
        </div>
        
        {/* Simulator Toggle */}
        <button
          onClick={() => {
            const nextVal = !isCompleted;
            setIsCompleted(nextVal);
            setQuizSelected(null);
            setQuizFeedback("");
            if (nextVal) {
              addXp(350, "Menyelesaikan Seluruh Modul Roblox & AI Scripting", undefined, 2);
            }
          }}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors relative z-25 ${
            isCompleted 
              ? "bg-green-50 text-green-600 border-green-200" 
              : "bg-white text-charcoal border-neutral-200"
          }`}
        >
          {isCompleted ? "Simulasi: Completed (100%)" : "Simulasi: Belum Selesai (65%)"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {expandedModuleId === null ? (
          // GRID VIEW OF MODULES
          <motionImported.div 
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={iosSpring}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {modules.map((mod) => (
              <motionImported.div
                key={mod.id}
                layoutId={`module-card-${mod.id}`}
                onClick={() => setExpandedModuleId(mod.id)}
                whileHover={{ scale: 1.025, y: -4 }}
                whileTap={{ scale: 0.96 }}
                transition={iosSpring}
                className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm cursor-pointer hover:shadow-md flex flex-col justify-between min-h-[190px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#0066CC]/5 to-transparent rounded-bl-full pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-bold text-[#0066CC] bg-[#0066CC]/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {mod.level}
                  </span>
                  <h3 className="text-sm font-bold text-[#1D1D1F] mt-4 leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-[11px] text-[#86868B] mt-2 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-4 mt-4 flex justify-between items-center text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
                  <span>{mod.duration}</span>
                  <span className="text-[#0066CC] flex items-center gap-0.5">Mulai Belajar <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </motionImported.div>
            ))}
          </motionImported.div>
        ) : (
          // WORKSPACE VIEW (SHARED ELEMENT EXPANSION)
          <motionImported.div
            key="workspace"
            layoutId={`module-card-${expandedModuleId}`}
            transition={iosSpring}
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/50 shadow-md relative"
          >
            {/* Close / Back button */}
            <motionImported.button
              onClick={() => setExpandedModuleId(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 p-2 rounded-full hover:bg-neutral-100 border border-neutral-200/50 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D1D1F] shadow-sm relative z-20 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Modul
            </motionImported.button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Media Player & Text Sub-Tabs */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 16:9 Video Player */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1A1A22] border border-neutral-200/10 group shadow-lg">
                  {isPlaying ? (
                    <iframe
                      className="w-full h-full rounded-2xl border-0"
                      src={activeVideoUrl}
                      title={activeModuleTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-[#1E1E2F] to-[#0A0A12]">
                      <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="perspective-grid" />
                      </div>
                      <motionImported.div 
                        onClick={() => setIsPlaying(true)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md cursor-pointer relative z-20 hover:bg-[#0066CC] transition-colors duration-300"
                      >
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </motionImported.div>
                      <span className="text-sm font-bold text-white mt-4 tracking-wide">{activeModuleTitle}</span>
                      <span className="text-[10px] text-neutral-400 font-mono mt-1">Video Tutorial • Durasi: {activeVideoDuration}</span>
                    </div>
                  )}
                </div>

                {/* Sub Tab selection with elastic bounce layout indicators */}
                <div className="border-b border-neutral-200 flex gap-6 relative">
                  {[
                    { id: "text", label: "Materi Teks", icon: FileText },
                    { id: "quiz", label: "Quiz Interaktif", icon: HelpCircle },
                    { id: "challenge", label: "Tantangan Koding", icon: Code }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = subTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={`flex items-center gap-1.5 pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors py-1 shrink-0 ${
                          isActive ? "text-[#0066CC]" : "text-[#86868B] hover:text-[#1D1D1F]"
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5 z-10" />
                        <span className="z-10">{tab.label}</span>
                        {isActive && (
                          <motionImported.span 
                            layoutId="activeSubTabIndicator"
                            className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0066CC]"
                            transition={iosBouncy}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Text / Challenge workspace content cards */}
                <motionImported.div 
                  layout
                  transition={iosSpring}
                  className="bg-white rounded-2xl p-6 border border-neutral-100 min-h-[190px]"
                >
                  <AnimatePresence mode="wait">
                    {subTab === "text" && (() => {
                      const content = MODULE_CONTENTS[expandedModuleId ?? 0];
                      return (
                        <motionImported.div
                          key="text"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4 text-sm text-[#86868B] leading-relaxed"
                        >
                          <h3 className="font-bold text-[#1D1D1F] text-base">{content?.textTitle}</h3>
                          {content?.textContent}
                        </motionImported.div>
                      );
                    })()}

                    {subTab === "quiz" && (() => {
                      const content = MODULE_CONTENTS[expandedModuleId ?? 0];
                      if (!content) return null;
                      const isCorrect = quizSelected === content.quizCorrectIndex;
                      return (
                        <motionImported.div
                          key="quiz"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="font-bold text-[#1D1D1F] text-sm mb-1">Pertanyaan Modul:</h3>
                            <p className="text-xs text-[#86868B]">{content.quizQuestion}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {content.quizOptions.map((opt, oIdx) => (
                              <motionImported.button
                                key={oIdx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswerSubmit(oIdx)}
                                className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all duration-300 ${
                                  quizSelected === oIdx 
                                    ? oIdx === content.quizCorrectIndex 
                                      ? "bg-green-50 border-green-300 text-green-700 font-bold" 
                                      : "bg-red-50 border-red-300 text-red-700"
                                    : "bg-white border-neutral-200 hover:bg-[#F5F5F7]/30 hover:border-neutral-300"
                                }`}
                              >
                                {opt}
                              </motionImported.button>
                            ))}
                          </div>

                          {quizFeedback && (
                            <motionImported.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 rounded-2xl border text-xs font-medium ${
                                isCorrect 
                                  ? "bg-green-50/50 border-green-200 text-green-700" 
                                  : "bg-red-50/50 border-red-200 text-red-700"
                              }`}
                            >
                              {quizFeedback}
                            </motionImported.div>
                          )}
                        </motionImported.div>
                      );
                    })()}

                    {subTab === "challenge" && (() => {
                      const content = MODULE_CONTENTS[expandedModuleId ?? 0];
                      return (
                        <motionImported.div
                          key="challenge"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="font-bold text-[#1D1D1F] text-base mb-1">Tantangan: {content?.challengeTitle}</h3>
                            <p className="text-xs text-[#86868B] leading-relaxed">
                              {content?.challengeDesc}
                            </p>
                          </div>
                          
                          <div className="relative rounded-2xl overflow-hidden border border-[#2c2c35] shadow-inner bg-[#1D1D26]">
                            <div className="bg-[#181820] px-4 py-2 border-b border-[#2c2c35] flex items-center justify-between text-[10px] font-mono text-neutral-500">
                              <span>script.lua</span>
                              <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                              </div>
                            </div>
                            
                            <textarea
                              rows={6}
                              value={challengeCode}
                              onChange={(e) => setChallengeCode(e.target.value)}
                              placeholder="-- Tulis skrip Roblox Lua Anda di sini..."
                              className="w-full p-4 bg-[#1E1E24] text-neutral-200 text-xs font-mono border-0 outline-none focus:ring-0 resize-none leading-relaxed"
                            />
                          </div>

                          <div className="flex justify-between items-center gap-4">
                            <motionImported.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleVerifyChallenge}
                              className="px-5 py-2.5 bg-[#0066CC] hover:bg-[#0077EE] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              Verifikasi Jawaban
                            </motionImported.button>
                            
                            {user?.completedChallenges?.includes(expandedModuleId ?? 0) && (
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Selesai
                              </span>
                            )}
                          </div>

                          {challengeFeedback && (
                            <motionImported.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 rounded-xl border text-xs font-medium ${
                                challengeError 
                                  ? "bg-red-50/50 border-red-200 text-red-700" 
                                  : "bg-green-50/50 border-green-200 text-green-700"
                              }`}
                            >
                              {challengeFeedback}
                            </motionImported.div>
                          )}
                        </motionImported.div>
                      );
                    })()}
                  </AnimatePresence>
                </motionImported.div>
              </div>

              {/* Right Column: Shimmering Certificate on completion & Syllabus */}
              <div className="lg:col-span-4">
                <div className="space-y-6">
                  
                  {/* Metallic Shimmer Certificate Wrapper */}
                  <div className={isCompleted ? "p-[2px] rounded-[26px] animate-shimmer-border" : ""}>
                    <div 
                      className={`rounded-[24px] p-6 transition-all duration-500 overflow-hidden relative flex flex-col justify-between min-h-[280px] ${
                        isCompleted 
                          ? "bg-white text-[#1D1D1F]" 
                          : "bg-white border border-neutral-200/50 shadow-sm text-neutral-400"
                      }`}
                    >
                      {/* Metallic shine reflection overlay */}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none -translate-x-full animate-[shimmer_3s_infinite]" />
                      )}

                      {/* Badge asset */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full pointer-events-none flex items-center justify-center">
                        <motionImported.div
                          animate={isCompleted ? {
                            rotate: 360,
                            scale: [1, 1.08, 1],
                            filter: [
                              "drop-shadow(0 0 4px rgba(255,204,0,0.3))",
                              "drop-shadow(0 0 16px rgba(255,204,0,0.75))",
                              "drop-shadow(0 0 4px rgba(255,204,0,0.3))"
                            ]
                          } : {}}
                          transition={{ 
                            rotate: { duration: 15, ease: "linear", repeat: Infinity },
                            scale: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
                            filter: { duration: 2.5, ease: "easeInOut", repeat: Infinity }
                          }}
                          className={`p-2.5 rounded-full ${isFinishedSyllabus ? "bg-[#FFCC00]/10 text-amber-500 shadow" : "bg-neutral-100 text-neutral-300"}`}
                        >
                          {isFinishedSyllabus ? <Award className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                        </motionImported.div>
                      </div>

                      <div className="relative z-10">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isFinishedSyllabus ? "bg-[#FFCC00]/10 text-amber-600" : "bg-neutral-100 text-neutral-400"
                        }`}>
                          Sertifikat Kelulusan
                        </span>
                        
                        <h3 className="text-lg font-extrabold tracking-tight mt-6 text-[#1D1D1F]">
                          {isFinishedSyllabus ? "Sertifikat Siap Dicetak! 🎓" : "Sertifikat Masih Terkunci"}
                        </h3>
                        
                        <p className={`text-xs mt-2 leading-relaxed ${
                          isFinishedSyllabus ? "text-[#1D1D1F]/80" : "text-[#86868B]"
                        }`}>
                          {isFinishedSyllabus 
                            ? "Selamat! Anda telah menyelesaikan 100% kurikulum Sandbox Roblox & AI Scripting. Sertifikat keahlian Anda siap diunduh." 
                            : `Selesaikan seluruh kuis dan tantangan koding untuk membuka dokumen sertifikasi keahlian koding Anda. Progres saat ini: ${completionPercentage}%.`}
                        </p>
                      </div>

                      <div className="mt-8 border-t border-neutral-100 pt-6 relative z-10">
                        {isFinishedSyllabus ? (
                          <motionImported.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => alert("Sertifikat Anda berhasil diunduh sebagai PDF!")}
                            className="w-full py-3 rounded-xl bg-[#1D1D1F] hover:bg-neutral-800 text-white text-xs font-bold transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5"
                          >
                            <Award className="w-4 h-4" />
                            Unduh Sertifikat PDF
                          </motionImported.button>
                        ) : (
                          <div className="flex items-center gap-2 text-xs font-bold text-[#86868B]">
                            <Lock className="w-4 h-4" />
                            <span>Progres: {completedTasksCount}/28 tugas selesai</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Syllabus list */}
                  <div className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Silabus Modul</h4>
                    <div className="space-y-3.5 text-xs font-medium">
                      {modules.map((item, idx) => {
                        const completedCount = (user?.completedQuizzes?.includes(item.id) ? 1 : 0) + (user?.completedChallenges?.includes(item.id) ? 1 : 0);
                        return (
                          <div key={idx} className="flex justify-between items-center py-1">
                            <span className={completedCount > 0 ? "text-[#1D1D1F]" : "text-[#86868B]"}>{item.title}</span>
                            {completedCount === 2 ? (
                              <span className="w-5 h-5 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3" />
                              </span>
                            ) : completedCount === 1 ? (
                              <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center shrink-0 text-[10px] font-bold">
                                1/2
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-400 border border-neutral-200/50 flex items-center justify-center shrink-0">
                                <Lock className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motionImported.div>
        )}
      </AnimatePresence>

    </div>
  );
}
