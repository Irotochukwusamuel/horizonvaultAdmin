'use client';
import { DataTable } from '@/components/data-table';
import { AdminColumns } from '@/app/(dashboard)/(routes)/admins/components/columns';



const Body = ({ data }: { data: Array<object> }) => {

  const row = data ?? []

  return (
    <>

      <section className="rounded-[16px] border-[1px] h-auto border-[#D3D6DA] mt-5">

        <div className="py-10">

          <div>
            <DataTable
              searchKey="wallet_name"
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
