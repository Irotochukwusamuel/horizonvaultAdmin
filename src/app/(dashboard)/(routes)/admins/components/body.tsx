'use client';
import Button from '@/components/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { AppwriteUser } from '@/types/user';
import { AdminColumns } from '@/app/(dashboard)/(routes)/admins/components/columns';


const Card = ({ title, num }: { title: string, num: string | number }) => {
  return (
    <div className="w-full p-[20px] rounded-[8px] border-[1px] cursor-pointer border-[#ABADB0]">
      <p className="text-[#929498] text-[14px]">{title}</p>
      <p className="text-[24px] font-[600]">{num}</p>
    </div>
  );
};

const Body = ({ data }: { data: AppwriteUser[] }) => {
  const total_users = data.length;
  const active_users = data.filter((data) => !data?.is_deleted);
  const ban_users = data.filter((data) => data?.is_deleted);
  const info = [{ title: 'Total Number of Admins', num: total_users }, { title: 'Total Active', num: active_users.length }, { title: 'Total Disabled', num: ban_users.length }];
  const header_info = [{ name: 'Active Admins'}, { name: 'Disabled Admins'}];
  const [hearder_active_tab, set_hearder_active_tab] = useState<string>(header_info[0]?.name);
  const row = hearder_active_tab == 'Active Admins' ? active_users : ban_users;

  return (
    <>
      <div className="flex items-center mt-5 gap-5">
        {info.map((item, key) => <Card key={key} title={item?.title} num={item?.num} />)}
      </div>
      <section className="rounded-[16px] border-[1px] h-auto border-[#D3D6DA] mt-5">
        <header className="px-5 pt-5 border-b-[1px] border-b-[#D3D6DA]">
          <div className="flex gap-5 mt-2">
            {header_info.map((item, key) => {
              const isActive = hearder_active_tab == item?.name;
              return (
                <div
                  key={key}
                  onClick={() => set_hearder_active_tab(item?.name)}
                  className={cn('flex  items-center text-[15px] text-[#6C757D] font-[600px] border-0 rounded-none border-b-2 border-transparent pb-2 hover:bg-transparent hover:text-[#6C757D]', isActive && 'border-[#6C757D]')}

                >
                  <Button
                    variant={'secondary'}
                    className="border-0 hover:bg-transparent text-[#6C757D] hover:text-[#6C757D]"
                  >
                    {item?.name}
                  </Button>
                </div>
              );
            })}
          </div>
        </header>


        <div className="py-10">

          <div>
            <DataTable
              searchKey="fullName"
              hasFooter
              paginationSize={5}
              regular
              columns={AdminColumns}
              data={row}
            />
          </div>

        </div>


      </section>
    </>

  );
};

export default Body;
