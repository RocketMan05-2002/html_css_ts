import bcrypt from "bcryptjs";
import {User} from "../models/User"
import {Session} from "../models/Session"
export class AuthManager {
    private users: User[] = [];
    private sessions: Session[] = [];

    private readonly saltRounds = 10;

    private generateToken():string{
        const randomPart = Math.random().toString(36).substring(2);
        const timePart = Date.now().toString();

        return `token_${randomPart}_${timePart}`;
    }

    async register(email:string, password:string):Promise<Omit<User, "passwordHash">>{
        const existingUser = this.users.find(user=>user.email===email);
        if(existingUser){
            throw new Error("User already exists");
        }

        const passwordHash = await bcrypt.hash(password, this.saltRounds);
        const newUser: User = {
            id: Date.now(),
            email,
            passwordHash,
        };

        this.users.push(newUser);
        const {passwordHash: _, ...safeUser} = newUser;
        return safeUser;
    }

    async login(email:string, password: string):Promise<string> {
        const user = this.users.find(user=>user.email === email);
        if(!user){
            return "User not found!";
        }
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if(!isValid){
            return "Invalid credentials!";
        }

        const token = this.generateToken();
        const newSession:Session = {
            token,
            userId: user.id,
            createdAt: new Date(),
        };

        this.sessions.push(newSession);
        return token;
    }

    logout(token:string):void{
        this.sessions = this.sessions.filter(sesh=>sesh.token!==token);
    }

    getUserFromToken(token:string):User | null {
        const session = this.sessions.find(sesh=>sesh.token === token);
        if(!session) return null;
        const user = this.users.find(user=>user.id===session.userId);
        if(!user) return null;
        return user;
    }

    getAllUsers():Omit<User,"passwordHash">[]{
        return this.users.map(({passwordHash, ...safeUser})=>safeUser);
    }

    getAllSessions():Session[]{
        return this.sessions;
    }

}