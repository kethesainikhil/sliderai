'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Appbar() {
  const { data: session } = useSession()
  const router = useRouter();
console.log(session)

  if (session) {
    return (
      <div className="flex py-2 justify-between sm:px-20">
<div className="flex gap-2 items-center justify-center">       Welcome Back: <span className="font-medium text-2xl ">{session.user.email} </span> <span class="flex items-center justify-center w-4 h-4 rounded-full bg-green-500">
  <svg class="w-2 h-2 fill-current text-white" viewBox="0 0 20 20">
    <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 7C9.43 7 7 9.43 7 12C7 14.57 9.43 17 12 17C14.57 17 17 14.57 17 12C17 9.43 14.57 7 12 7ZM12 15C9.43 15 7 12.57 7 12C7 11.43 9.43 9 12 9C14.57 9 17 11.43 17 12C17 12.57 14.57 15 12 15Z"></path>
  </svg>
</span>  </div><br />
        <button className="bg-red-500 hover:bg-black rounded-2xl px-4 py-2" onClick={() => {signOut()
          localStorage.removeItem("emails")
          router.push("/")
        }}>Sign out</button>

      </div>
    )
  }
  return (
    <div className="flex py-2 justify-between sm:px-20">

      Not signed in <br />
      <button className="bg-green-500 hover:bg-black rounded-2xl px-4 py-2" onClick={
        () => {signIn()
          

        }
      }>Sign in</button>
    </div>
  )
}