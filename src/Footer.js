import React from 'react'

const Footer = ({length}) => {
    const today = new Date();

  return (
    <footer>
    <p>{length} {length===1?"item":" items"} in the List </p>
    <p> Copyright &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer
