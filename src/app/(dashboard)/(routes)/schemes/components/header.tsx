'use client';
import DialogPop from '@/components/dialog-view';
import React, {useState} from 'react';
import {Input} from '@/components/input';
import {Label} from "@/components/ui/label";
import Select from 'react-select';
import {parseCookies} from "nookies";
import {CommonApi} from "@/services/CommonAPI";

const Header = () => {
    const [name, set_name] = useState('');
    const [rate, set_rate] = useState(0);
    const [minimum, set_minimum] = useState(0);
    const [maximum, set_maximum] = useState(0);
    const [interval, set_interval] = useState('');
    const cookies = parseCookies(null)
    const common = new CommonApi(cookies?.sessionId)
    const options = [
        {label: 'Daily', value: 'daily'},
        {label: 'Bi-Days', value: 'bidays'},
        {label: 'Tri-days', value: 'tridays'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Bi-Weekly', value: 'biweekly'},
        {label: 'Monthly', value: 'monthly'},
        {label: 'Yearly', value: 'yearly'},
    ]


    const CreatWallet = () => {
        return (
            <form
                className="my-5 grid grid-cols-2 gap-4"
            >


                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Investment Name
                    </Label>
                    <Input
                        onChange={(e) => set_name(e.target.value)}
                        id="name"
                        type='text'
                        className="col-span-3"
                    />
                </div>

                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Investment Rate
                    </Label>
                    <Input
                        onChange={(e) => set_rate(e.target.value)}
                        id="name"
                        type='number'
                        className="col-span-3"
                    />
                </div>
                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Investment Minimum Amount
                    </Label>
                    <Input
                        onChange={(e) => set_minimum(e.target.value)}
                        id="name"
                        type='number'
                        className="col-span-3"
                    />
                </div>
                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Investment Maximum Amount
                    </Label>
                    <Input
                        onChange={(e) => set_maximum(e.target.value)}
                        id="name"
                        type='number'
                        className="col-span-3"
                    />
                </div>

                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right font-semibold">
                        Investment Interval
                    </Label>
                    <Select
                        placeholder='Search interval'
                        defaultValue={interval}
                        onChange={set_interval}
                        options={options}
                        isSearchable={true}
                    />
                </div>


            </form>
        );
    };

    return (
        <section>
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-[30px] text-base-black font-bold">Investment Schemes</p>
                </div>

                <DialogPop
                    TriggerName="Add Scheme"
                    TriggerClassName="bg-base-black text-[16px] text-base-white"
                    DialogName="Add Scheme"
                    DialogDesc={CreatWallet()}
                    DialogCancelName="Cancel"
                    DialogActionName="Add Scheme"
                    SuccessMessage={"Scheme has been added"}
                    DialogActionCallback={async () => await common.CreateScheme(name, rate, minimum, maximum, interval?.value)}
                    DialogClassName={'sm:max-w-[500px]'}
                    DialogActionClassName="bg-[#2D3045]"
                    DialogCancelClassName="border-[#2D3045] text-base-black"

                />
            </header>

        </section>
    );
};


export default Header;
