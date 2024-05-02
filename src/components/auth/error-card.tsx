import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "@/components/auth/card-wrapper"

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
     <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive size-6" />
     </div>
    </CardWrapper>
  )
}