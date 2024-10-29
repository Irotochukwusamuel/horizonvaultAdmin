'use client';
import {DataTable} from '@/components/data-table';
import {AppwriteUser} from '@/types/user';
import {CustomerColumns} from '@/app/(dashboard)/(routes)/users/components/columns';


const Card = ({title, num}: { title: string, num: string | number }) => {
    return (
        <div className="w-[340px] p-[20px] rounded-[8px] border-[1px] cursor-pointer border-[#ABADB0]">
            <p className="text-[#929498] text-[14px]">{title}</p>
            <p className="text-[24px] font-[600]">{num}</p>
        </div>
    );
};

type UsersType = {
    users: AppwriteUser[]
    total_items: number
    results: { [key: string]: any }

}

const Body = ({data}: { data: UsersType }) => {
    const total_users = data?.total_items;
    const paid_users = data?.results?.total_active_users;
    const deleted_user = data?.results?.total_deactivated_users;
    const info = [{title: 'Total Number of Customers', num: total_users}, {title: 'Total Active Customers', num: paid_users}, {title: 'Total InActive Customers', num: deleted_user}];


    const current_row = () => {
        let row: AppwriteUser[] = [];
        row = data?.results?.users;
        return row;
    };

    return (
        <>
            <div className="flex items-center mt-5 gap-5">
                {info.map((item, key) => <Card key={key} title={item?.title} num={item?.num}/>)}
            </div>
            <section className="rounded-[16px] border-[1px] h-auto border-[#D3D6DA] mt-5">


                <div className="py-10">


                    <div>
                        <DataTable
                            searchKey="email"
                            hasFooter
                            paginationSize={10}
                            regular
                            columns={CustomerColumns}
                            data={current_row()}

                        />
                    </div>
                </div>


            </section>
        </>

    );
};

export default Body;
