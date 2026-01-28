"use client"

import React from 'react'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { PackageX, Shield, UserCog } from 'lucide-react'
import { cn } from '@/lib/utils'
import Avatar from '@/components/Avatar'
import { useGetAdminsAndManagers } from '@/hooks/useUser'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/types/global'


const AdminsManagersTable: React.FC = () => {
  const { data, isFetching, isError } = useGetAdminsAndManagers()
  const adminAndManagers: User[] = data?.data || []

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
      {isFetching ? <Skeleton className="w-full h-full rounded-md" />
        : (isError || !adminAndManagers.length) ? <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <PackageX className="w-10 h-10" />
          <p className="font-medium text-sm text-center">
            No data available
          </p>
        </div>
          : <React.Fragment>
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
                  {adminAndManagers && adminAndManagers.length > 0 ? (
                    adminAndManagers.map((user) => (
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
          </React.Fragment>
      }
    </Card>
  )
}

export default AdminsManagersTable