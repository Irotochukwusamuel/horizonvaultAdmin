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
import Select from "react-select";

interface DialogPopInterface {
    TriggerName?: string
    TriggerClassName: string
    TriggerIcon?: React.ReactElement
    SuccessMessage?: string
    DialogActionClassName?: string
    DialogCancelClassName?: string
    DisableActionButton?: boolean
    investmentId: number
    actionType: 'Credit' | 'Debit'

}

export function UpdateStatus({
                                 SuccessMessage,
                                 TriggerClassName,
                                 TriggerIcon,
                                 TriggerName,
                                 DialogCancelClassName,
                                 DisableActionButton,
                                 DialogActionClassName,
                                 investmentId,
                                 actionType
                             }: DialogPopInterface) {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isloading, setLoading] = useState(false);
    const router = useRouter();
    const cookies = parseCookies(null)
    const common = new CommonApi(cookies?.sessionId)
    const [status, set_status] = useState('Approved');

    const options = [
        {label: 'Approved', value: 'approved'},
        {label: 'Pending', value: 'pending'},
        {label: 'Processing', value: 'processing'},
        {label: 'Failed', value: 'failed'},
        {label: 'Completed', value: 'completed'},
    ]


    const onChange = (isDialogOpen: boolean) => {
        if (!isDialogOpen) {
            setDialogOpen(false);
        }
    };

    const handleAction = async () => {
        try {
            setLoading(true);
            console.log("status", status)
            const res = await common.UpdateInvestmentStatus(investmentId, status?.value)

            SuccessMessage && toast.success(res ?? SuccessMessage, {position: 'top-right'});

            window.location.reload()
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
                            Update Investment Status
                        </Label>
                        <Select
                            placeholder='Search Status Name..'
                            defaultValue={status}
                            onChange={set_status}
                            options={options}
                            isSearchable={true}
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
