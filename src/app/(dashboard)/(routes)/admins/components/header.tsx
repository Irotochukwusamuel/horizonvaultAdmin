'use client';
import DialogPop from '@/components/dialog-view';
import React, {useState} from 'react';
import {Input} from '@/components/input';
import {Label} from "@/components/ui/label";
import Select from 'react-select';
import {parseCookies} from "nookies";
import {CommonApi} from "@/services/CommonAPI";

const Header = ({wallet_list}: { wallet_list: Array<{ [key: string]: string }> }) => {
    const [wallet_address, set_wallet_address] = useState('');
    const [wallet_network, set_wallet_network] = useState('');
    const [coin_id, set_coin_id] = useState(null);
    const cookies = parseCookies(null)
    const common = new CommonApi(cookies?.sessionId)
    const options = wallet_list?.map((item) => ({value: item?.id, label: item?.name}))




    const CreatWallet = () => {
        return (
            <form
                className="my-5 flex flex-col gap-[24px]"
            >

                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Wallet Name
                    </Label>
                    <Select
                        placeholder='Search Wallet Name..'
                        defaultValue={coin_id}
                        onChange={set_coin_id}
                        options={options}
                        isSearchable={true}
                    />
                </div>

                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Wallet Address
                    </Label>
                    <Input
                        onChange={(e) => set_wallet_address(e.target.value)}
                        id="name"
                        type='text'
                        className="col-span-3"
                    />
                </div>

                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Wallet Network
                    </Label>
                    <Input
                        onChange={(e) => set_wallet_network(e.target.value)}
                        id="name"
                        type='text'
                        className="col-span-3"
                    />
                </div>

            </form>
        );
    };

    return (
        <section>
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-[30px] text-base-black font-bold">Admin Wallets</p>
                </div>

                <DialogPop
                    TriggerName="Add Wallet"
                    TriggerClassName="bg-base-black text-[16px] text-base-white"
                    DialogName="Add Wallet"
                    DialogDesc={CreatWallet()}
                    DialogCancelName="Cancel"
                    DialogActionName="Add Wallet"
                    SuccessMessage={"Wallet has been added"}
                    DialogActionCallback={async () => await common.AddAdminWallet(wallet_address, Number(coin_id?.value), wallet_network)}
                    DialogClassName={'sm:max-w-[500px]'}
                    DialogActionClassName="bg-[#2D3045]"
                    DialogCancelClassName="border-[#2D3045] text-base-black"

                />
            </header>

        </section>
    );
};


export default Header;

