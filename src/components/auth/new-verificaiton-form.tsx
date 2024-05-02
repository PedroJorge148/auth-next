'use client'

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { newVerification } from "@/actions/new-verification"

export function NewVerificationForm() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const token = searchParams.get('token')

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError('Missing token!')
      return
    }

    await newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper 
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}