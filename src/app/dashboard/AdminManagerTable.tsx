"use client"

import React from 'react'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Shield, UserCog } from 'lucide-react'
import { AdminsManagersTableProps } from '@/types/components'
import { cn } from '@/lib/utils'
import Avatar from '@/components/Avatar'


const AdminsManagersTable: React.FC<AdminsManagersTableProps> = ({ users }) => {
  const getRoleBadgeColor = (role: string) => {
    return role === 'ADMIN'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800'
  }

  const getRoleIcon = (role: string) => {
    return role === 'ADMIN' ? <Shield className="w-4 h-4" /> : <UserCog className="w-4 h-4" />
  }

  return (
    <Card className="h-[250px] max-h-[250px] p-6 block col-span-1 md:col-span-2 xl:col-span-3 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <h3 className="mb-1 font-semibold text-lg text-foreground">Admins & Managers</h3>
      <div className="overflow-x-auto overflow-y-auto max-h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Governorate</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar firstName={user.firstName} />

                    <div className="font-medium">
                      <p>{user.firstName} {user.lastName}</p>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{user.governorate}</p>
                    <span className="text-xs text-muted-foreground">{user.phone}</span>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "px-3 py-1 inline-flex items-center gap-2 rounded-full font-medium text-xs",
                      getRoleBadgeColor(user.role)
                    )}>
                      {getRoleIcon(user.role)}
                      {user.role}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No admins or managers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

export default AdminsManagersTable