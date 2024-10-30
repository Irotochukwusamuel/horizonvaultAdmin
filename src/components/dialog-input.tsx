import Button from '@/components/button';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/input";
import {Label} from "@/components/ui/label"
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {CommonApi} from "@/services/CommonAPI";
import {parseCookies} from "nookies";

interface DialogPopInterface {
    TriggerName?: string
    TriggerClassName: string
    TriggerIcon?: React.ReactElement
    SuccessMessage?: string
    DialogActionClassName?: string
    DialogCancelClassName?: string
    DisableActionButton?: boolean
    wallet_id: string
    actionType: 'Credit' | 'Debit'

}

export function DialogInput({
                                SuccessMessage,
                                TriggerClassName,
                                TriggerIcon,
                                TriggerName,
                                DialogCancelClassName,
                                DisableActionButton,
                                DialogActionClassName,
                                wallet_id,
                                actionType
                            }: DialogPopInterface) {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isloading, setLoading] = useState(false);
    const [amount, set_amount] = useState(0);
    const router = useRouter();
    const cookies = parseCookies(null)
    const common = new CommonApi(cookies?.sessionId)
    const onChange = (isDialogOpen: boolean) => {
        if (!isDialogOpen) {
            setDialogOpen(false);
        }
    };

    const handleAction = async () => {
        try {
            let res;
            setLoading(true);
            const c_amount = Number(amount);
            if (actionType == 'Credit') {
                res = await common.CreditWallet(wallet_id, c_amount)
            } else {
                res = await common.DebitWallet(wallet_id, c_amount)

            }

            SuccessMessage && toast.success(res ?? SuccessMessage, {position: 'top-right'});


        } catch (error: any) {
            console.log(error)
            toast.error(error ?? "An error occurred", {position: 'top-right'});

        } finally {
            router.refresh();
            setLoading(false);
            setDialogOpen(false);
        }
    };


    return (
        <Dialog open={isDialogOpen} onOpenChange={onChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline-green"
                    className={TriggerClassName}
                    onClick={() => setDialogOpen(true)}
                    icon={TriggerIcon && [
                        {
                            icon: (TriggerIcon),
                            position: 'left',
                        },
                    ]}

                >
                    {TriggerName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

                <div className="grid gap-4 py-4">
                    <div className="items-center gap-4">
                        <Label htmlFor="name" className="text-right font-semibold">
                            Amount
                        </Label>
                        <Input
                            onChange={(e) => set_amount(e.target.value)}
                            id="name"
                            type='number'
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline-green"
                                className={cn('border-[#D92D20] border-[1px] rounded-[4px] text-[#D92D20] w-full font-semibold', DialogCancelClassName)}>Cancel</Button>
                    </DialogClose>
                    <Button
                        disabled={DisableActionButton ?? false}
                        onClick={handleAction}
                        loading={isloading}
                        variant="outline-green" className={cn('bg-[#D92D20] text-base-white w-full font-semibold', DialogActionClassName)}
                    >
                        {isloading ? 'Loading' : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
