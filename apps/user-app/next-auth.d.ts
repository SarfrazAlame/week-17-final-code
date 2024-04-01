declare module "next-auth" {
    interface Session {
        user:{
            phone:string,
            password:string
        }
    }
}