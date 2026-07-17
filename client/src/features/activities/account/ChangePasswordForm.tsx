import { Password } from "@mui/icons-material";
import { changePasswordSchema, type ChanegPasswordSchema } from "../../../lib/schemas/ChangePasswordSchema"
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/layout/shared/componnents/TextInput";
import { useAccount } from "../../../lib/hooks/useAccount";
import { toast } from "react-toastify";


export default function ChangePasswordForm() {
    const {changePassword} = useAccount();
    const onSubmit = async (data: ChanegPasswordSchema) => {
     try {
              await changePassword.mutateAsync(data , {
                onSuccess:() => toast.success('Your password has been changed')
              }) 
        } catch (error) {
            console.log(error);
            
        }
        
    }
  return (
    <AccountFormWrapper<ChanegPasswordSchema>
        title='Change password'
        icon={<Password fontSize="large" />}
        onSubmit={onSubmit}
        submitButtonText="Update password"
        resolver={zodResolver(changePasswordSchema)}
        reset={true}
        >
            <TextInput type="password" label="Current password" name="currentPassword" />
            <TextInput type="password" label="New password" name="newPassword" />
            <TextInput type="password" label="Confirm password" name="confirmPassword" />

    </AccountFormWrapper>
  )
}
