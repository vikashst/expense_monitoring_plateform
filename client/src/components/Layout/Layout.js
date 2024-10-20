import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'

const Layout = ({children})=>{  // Instead of passing "Header & Footer" file again and again for every component, we wrapped both in "Layout" and can directly pass "Layout".
    return(
        <>
            <Header />
            <div className='content'>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout