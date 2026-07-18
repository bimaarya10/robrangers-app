import fs from "fs";
import path from "path";
import crypto from "crypto";

// Define the Database schemas
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  xp: number;
  level: number;
  githubConnected: boolean;
  githubUsername: string;
  completedQuizzes: number[];
  completedChallenges: number[];
  learningHistory: Array<{
    title: string;
    date: string;
    status: string;
  }>;
  createdAt: string;
}

export interface ShowcaseProject {
  id: number;
  title: string;
  author: string;
  authorId: string;
  plays: string;
  score: number;
  feedback: string;
  likes: number;
  likedBy: string[]; // List of user IDs who liked it
  filePath?: string; // Physical file path on disk
  createdAt: string;
}

export interface LoginLog {
  id: string;
  userId: string | null;
  email: string;
  timestamp: string;
  ip: string;
  status: "success" | "failed";
}

export interface ChatMessage {
  id: string;
  userId: string;
  sender: "user" | "ai";
  text: string;
  createdAt: string;
}

export interface ModuleVideo {
  id: number;
  moduleTitle: string;
  videoUrl: string;
  duration: string;
}

interface DatabaseSchema {
  users: User[];
  projects: ShowcaseProject[];
  loginLogs: LoginLog[];
  chatMessages: ChatMessage[];
  moduleVideos: ModuleVideo[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

// Default showcase projects
const DEFAULT_PROJECTS: ShowcaseProject[] = [
  {
    id: 1,
    title: "Neon City Deathrun",
    author: "Ranger Arya",
    authorId: "seed-user-1",
    plays: "1.2K plays",
    score: 92,
    feedback: "Sensor platform dinamis dan looping pergerakan part diatur dengan tingkat keamanan skrip server-side yang sangat baik. Nilai lebih pada estetika visual neon.",
    likes: 12,
    likedBy: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Lava Jump Arena v2",
    author: "Ranger Beatrice",
    authorId: "seed-user-2",
    plays: "820 plays",
    score: 88,
    feedback: "Desain UI leaderboard sangat responsif. Sedikit optimasi diperlukan pada modul sensor sentuhan agar tidak memicu delay ganda pada datastore.",
    likes: 8,
    likedBy: ["seed-user-1"],
    createdAt: new Date().toISOString()
  }
];

// Default syllabus videos (Roblox learning content)
// Default syllabus videos (Roblox learning content)
const DEFAULT_VIDEOS: ModuleVideo[] = [
  {
    id: 0,
    moduleTitle: "00. Pembahasan Lua(u) Roblox",
    videoUrl: "https://www.youtube.com/embed/CAUSzPsnOE0",
    duration: "2:45"
  },
  {
    id: 1,
    moduleTitle: "01. Printing, Dan Jenis Data",
    videoUrl: "https://www.youtube.com/embed/1ke9bR5t2to",
    duration: "7:56"
  },
  {
    id: 2,
    moduleTitle: "02. Local Variable, Dan Global Variable",
    videoUrl: "https://www.youtube.com/embed/2NKrG4xCNeM",
    duration: "6:20"
  },
  {
    id: 3,
    moduleTitle: "03. If else Statements",
    videoUrl: "https://www.youtube.com/embed/mflMZJxiR58",
    duration: "7:26"
  },
  {
    id: 4,
    moduleTitle: "04. Basic Functions, Dan Passing Data",
    videoUrl: "https://www.youtube.com/embed/CtbVUVn6BlU",
    duration: "9:15"
  },
  {
    id: 5,
    moduleTitle: "05. Basic Array, Dan Dictionary",
    videoUrl: "https://www.youtube.com/embed/9HRoaXNu13o",
    duration: "12:24"
  },
  {
    id: 6,
    moduleTitle: "06. While Loop",
    videoUrl: "https://www.youtube.com/embed/xrHRggNhJNs",
    duration: "8:33"
  },
  {
    id: 7,
    moduleTitle: "07. For Loop",
    videoUrl: "https://www.youtube.com/embed/vTJF-Ody2Kk",
    duration: "14:14"
  },
  {
    id: 8,
    moduleTitle: "08. Instance Indexing",
    videoUrl: "https://www.youtube.com/embed/jXfd-qiSISc",
    duration: "17:31"
  },
  {
    id: 9,
    moduleTitle: "09. Modifikasi Instance",
    videoUrl: "https://www.youtube.com/embed/c5TW2Ty4nUY",
    duration: "8:45"
  },
  {
    id: 10,
    moduleTitle: "10. Tipe Data Primitif",
    videoUrl: "https://www.youtube.com/embed/vW12Z4e8TYM",
    duration: "10:17"
  },
  {
    id: 11,
    moduleTitle: "11. Perkenalan Instance Lebih Dalam",
    videoUrl: "https://www.youtube.com/embed/O9Wq4YKcmhE",
    duration: "8:57"
  },
  {
    id: 12,
    moduleTitle: "12. DataStoreService + Secret Module",
    videoUrl: "https://www.youtube.com/embed/7mhHPotPfhU",
    duration: "21:54"
  },
  {
    id: 13,
    moduleTitle: "13. game:GetService()",
    videoUrl: "https://www.youtube.com/embed/PzXqd8hf1hM",
    duration: "4:05"
  }
];

// Helper to ensure DB exists and read/write contents
class DatabaseManager {
  private init() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialData: DatabaseSchema = {
        users: [],
        projects: DEFAULT_PROJECTS,
        loginLogs: [],
        chatMessages: [],
        moduleVideos: DEFAULT_VIDEOS
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
    } else {
      // Auto-migrate schema changes in existing database
      try {
        const fileContent = fs.readFileSync(DB_FILE, "utf8");
        const parsed = JSON.parse(fileContent);
        let migrated = false;

        if (!parsed.loginLogs) {
          parsed.loginLogs = [];
          migrated = true;
        }
        if (!parsed.chatMessages) {
          parsed.chatMessages = [];
          migrated = true;
        }
        
        const oldVersion = parsed.moduleVideos && parsed.moduleVideos[0] && parsed.moduleVideos[0].duration.includes("Mins");
        if (!parsed.moduleVideos || parsed.moduleVideos.length < 14 || oldVersion) {
          parsed.moduleVideos = DEFAULT_VIDEOS;
          migrated = true;
        }

        if (migrated) {
          fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), "utf8");
        }
      } catch (err) {
        console.error("Gagal melakukan migrasi skema database:", err);
      }
    }
  }

  private read(): DatabaseSchema {
    this.init();
    try {
      const data = fs.readFileSync(DB_FILE, "utf8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading database file, resetting:", e);
      return { 
        users: [], 
        projects: DEFAULT_PROJECTS,
        loginLogs: [],
        chatMessages: [],
        moduleVideos: DEFAULT_VIDEOS
      };
    }
  }

  private write(data: DatabaseSchema) {
    this.init();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  }

  // Password hashing helper
  hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  // Users CRUD
  getUsers(): User[] {
    return this.read().users;
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(name: string, email: string, passwordPlain: string): User {
    const db = this.read();
    
    // Check if user already exists
    const exists = db.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error("Email ini sudah terdaftar.");
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      passwordHash: this.hashPassword(passwordPlain),
      phone: "",
      xp: 0,
      level: 1,
      githubConnected: false,
      githubUsername: "",
      completedQuizzes: [],
      completedChallenges: [],
      learningHistory: [
        {
          title: "Registrasi Akun Baru",
          date: "Baru saja",
          status: "Selesai"
        }
      ],
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    this.write(db);
    return newUser;
  }

  updateUser(id: string, updates: Partial<Omit<User, "id" | "passwordHash" | "email" | "createdAt">>): User {
    const db = this.read();
    const userIndex = db.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    const updatedUser = {
      ...db.users[userIndex],
      ...updates
    };

    db.users[userIndex] = updatedUser;
    this.write(db);
    return updatedUser;
  }

  addXp(id: string, amount: number, activityTitle: string): User {
    const db = this.read();
    const userIndex = db.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    const user = db.users[userIndex];
    let newXp = user.xp + amount;
    
    // Simple levelling formula: every 1000 XP is 1 level
    // Starting level is 1
    const newLevel = Math.floor(newXp / 1000) + 1;
    
    // Add to learning history
    const historyItem = {
      title: activityTitle,
      date: "Baru saja",
      status: "Selesai"
    };

    const updatedHistory = [historyItem, ...user.learningHistory.slice(0, 19)]; // Keep max 20 items

    const updatedUser = {
      ...user,
      xp: newXp,
      level: newLevel,
      learningHistory: updatedHistory
    };

    db.users[userIndex] = updatedUser;
    this.write(db);
    return updatedUser;
  }

  // Projects CRUD
  getProjects(): ShowcaseProject[] {
    return this.read().projects;
  }

  createProject(
    title: string, 
    authorName: string, 
    authorId: string, 
    score: number, 
    feedback: string,
    fileBuffer?: Buffer
  ): ShowcaseProject {
    const db = this.read();
    const projectId = db.projects.length > 0 ? Math.max(...db.projects.map(p => p.id)) + 1 : 1;

    let savedFilePath = "";
    if (fileBuffer) {
      const uploadsDir = path.join(DB_DIR, "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const fileName = `project_${projectId}_${Date.now()}.rbxl`;
      const absolutePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(absolutePath, fileBuffer);
      savedFilePath = `/data/uploads/${fileName}`;
    }

    const newProject: ShowcaseProject = {
      id: projectId,
      title,
      author: authorName,
      authorId,
      plays: "0 plays",
      score,
      feedback,
      likes: 0,
      likedBy: [],
      filePath: savedFilePath || undefined,
      createdAt: new Date().toISOString()
    };

    db.projects.unshift(newProject); // Add to the top
    this.write(db);
    return newProject;
  }

  toggleLikeProject(projectId: number, userId: string): ShowcaseProject {
    const db = this.read();
    const projIndex = db.projects.findIndex(p => p.id === projectId);
    if (projIndex === -1) {
      throw new Error("Proyek tidak ditemukan.");
    }

    const project = db.projects[projIndex];
    const isLiked = project.likedBy.includes(userId);

    let updatedLikedBy: string[];
    if (isLiked) {
      updatedLikedBy = project.likedBy.filter(id => id !== userId);
    } else {
      updatedLikedBy = [...project.likedBy, userId];
    }

    const updatedProject = {
      ...project,
      likedBy: updatedLikedBy,
      likes: updatedLikedBy.length
    };

    db.projects[projIndex] = updatedProject;
    this.write(db);
    return updatedProject;
  }

  // Access Logs CRUD
  createLoginLog(userId: string | null, email: string, ip: string, status: "success" | "failed"): LoginLog {
    const db = this.read();
    const newLog: LoginLog = {
      id: crypto.randomUUID(),
      userId,
      email,
      timestamp: new Date().toISOString(),
      ip,
      status
    };
    db.loginLogs.push(newLog);
    this.write(db);
    return newLog;
  }

  getLoginLogs(): LoginLog[] {
    return this.read().loginLogs || [];
  }

  // Chat History CRUD
  createChatMessage(userId: string, sender: "user" | "ai", text: string): ChatMessage {
    const db = this.read();
    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      userId,
      sender,
      text,
      createdAt: new Date().toISOString()
    };
    db.chatMessages.push(newMsg);
    this.write(db);
    return newMsg;
  }

  getChatMessagesByUserId(userId: string): ChatMessage[] {
    const db = this.read();
    const chats = db.chatMessages || [];
    return chats.filter(m => m.userId === userId);
  }

  // Syllabus Videos CRUD
  getModuleVideos(): ModuleVideo[] {
    return this.read().moduleVideos || DEFAULT_VIDEOS;
  }
}

export const dbManager = new DatabaseManager();
