import { Suspense } from "react";
import WeddingInvite from "@/components/WeddingInvite"

const Page = () => {
  return (
    <>
      <Suspense fallback={null}>
        <WeddingInvite />
      </Suspense>
    </>
  )
}

export default Page