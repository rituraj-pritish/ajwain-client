import Link from 'next/link'

export default function Logo() {
  return (
    <Link href='/' className='mx-auto block w-fit'>
      <h2 className='font-bold tracking-widest rounded-md border-4 w-fit px-4 py-1'>
        AJWAIN
      </h2>
    </Link>
  )
}
