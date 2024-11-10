'use client';
import { DataTable } from '@/components/data-table';
import {AppwriteUserPayment, Investments} from '@/types/user';
import {InvestmentDetailColumn} from '@/app/(dashboard)/(routes)/users/components/columns';


const Card = ({ title, num }: { title: string, num: string | number }) => {
  return (
    <div className="w-[340px] p-[20px] rounded-[8px] border-[1px] cursor-pointer border-[#ABADB0]">
      <p className="text-[#929498] text-[14px]">{title}</p>
      <p className="text-[24px] font-[600]">{num}</p>
    </div>
  );
};

type UsersType = {
    users : AppwriteUserPayment[]
    total_items : number
    results : {[key : string] : any}

}

const Body = ({ data }: { data: Investments[] }) => {
  const total_transactions = data?.length;
  const total_transactions_approved = data?.filter((item)=> item?.status === 'approved')?.length;
  const total_transactions_failed = data?.filter((item)=> item?.status === 'failed')?.length;
  const total_transactions_processing = data?.filter((item)=> item?.status === 'processing')?.length;
  const info = [{ title: 'Total Number of Investments', num: total_transactions }, { title: 'Total Approved Investments', num: total_transactions_approved }, { title: 'Total Failed Investments', num: total_transactions_failed },  { title: 'Total Processing Investments', num: total_transactions_processing }];


  const current_row = () => {
    let row: AppwriteUserPayment[] = [];
    row = data ?? [];
    return row;
  };

  return (
    <>
      <div className="flex items-center mt-5 gap-5">
        {info.map((item, key) => <Card key={key} title={item?.title} num={item?.num} />)}
      </div>
      <section className="rounded-[16px] border-[1px] h-auto border-[#D3D6DA] mt-5">


        <div className="py-10">


          <div>
            <DataTable
              searchKey="email"
              hasFooter
              paginationSize={10}
              regular
              columns={InvestmentDetailColumn}
              data={current_row()}

            />
          </div>
        </div>


      </section>
    </>

  );
};

export default Body;



