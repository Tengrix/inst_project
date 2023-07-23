export default function Form({action, className, children}) {
  return (
    <form action={action} className={className}>
        {children}
        <button type="submit" className="btn btn_submit">Submit</button>
    </form>
  )
} 
