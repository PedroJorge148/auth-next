import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { type Session } from "next-auth"
import { Badge } from "./ui/badge"

interface UserInfoProps {
  user?: Session['user']
  label: string
}

export function UserInfo({ label, user }: UserInfoProps) {

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🖥 {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">
            ID
          </p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">
            Name
          </p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">
            Role
          </p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">
            Two Factor Authentication
          </p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}