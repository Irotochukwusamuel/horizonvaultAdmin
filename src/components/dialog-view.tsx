import Button from '@/components/button';
import {Loader2Icon} from 'lucide-react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {cn} from '@/lib/utils';
import {useRouter} from 'next/navigation';


interface DialogPopInterface {
    TriggerName?: string
    TriggerClassName: string
    TriggerIcon?: React.ReactElement
    DialogName: string,
    DialogDesc?: string | React.ReactNode
    DialogCancelName: string
    DialogActionName: string
    SuccessMessage?: string
    DialogClassName?: string
    DialogActionClassName?: string
    DialogCancelClassName?: string
    DisableActionButton?: boolean
    DialogActionCallback: () => void

}

export default function DialogPop(
    {
        TriggerName,
        TriggerClassName,
        TriggerIcon,
        DialogName,
        DialogDesc,
        DialogCancelName,
        DialogActionName,
        DialogActionCallback,
        DialogActionClassName,
        DialogCancelClassName,
        SuccessMessage,
        DialogClassName,
        DisableActionButton,
    }: DialogPopInterface) {

    const [isloading, setLoading] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

    const onChange = (isDialogOpen: boolean) => {
        if (!isDialogOpen) {
            setDialogOpen(false);
        }
    };

    const handleAction = async () => {
        try {
            setLoading(true);
            const res = await DialogActionCallback();
            console.log("api-result", res)
            SuccessMessage && toast.success(res ?? SuccessMessage, {position: 'top-right'});


        } catch (error) {
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
            <DialogContent className={DialogClassName}>
                <DialogHeader>
                    <DialogTitle className="text-[24px] font-semibold">{DialogName}</DialogTitle>
                    {
                        DialogDesc &&
                        <DialogDescription className="text-[#6C757D] text-[16px]">
                            {DialogDesc}
                        </DialogDescription>
                    }
                </DialogHeader>
                <DialogFooter className="flex !justify-between w-full mt-5">
                    <DialogClose asChild>
                        <Button variant="outline-green"
                                className={cn('border-[#D92D20] border-[1px] rounded-[4px] text-[#D92D20] w-full font-semibold', DialogCancelClassName)}>{DialogCancelName}</Button>
                    </DialogClose>
                    <Button
                        disabled={DisableActionButton ?? false}
                        onClick={handleAction}
                        loading={isloading}
                        variant="outline-green" className={cn('bg-[#D92D20] text-base-white w-full font-semibold', DialogActionClassName)}
                    >
                        {isloading ? 'Loading' : DialogActionName}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
