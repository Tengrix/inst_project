import Image from 'next/image'
 
export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      width={182}
      height={49}
      alt="Inctagram logo"
    />
  )
}
