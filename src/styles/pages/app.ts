import { styled } from "..";

export const MainContainer = styled('div', {
    display:"flex",
    flexDirection: 'column',
    alignItems:'flex-start',
    justifyContent:'center',
    minHeight:'100vh',
})

export const Header = styled('header',{
    padding:'2rem 0',
    width:'100%',
    maxWidth:'1180px',
    margin:'0px auto',

    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',

})



export const BagContainer = styled('div', {

    position: 'relative',
    
    button: {
        border:'none',
        outline:'none',
        cursor:'pointer',

        img: {
            lineHeight:'0'
        },
    
        span: {
            width:'1.5rem',
            height:'1.5rem',
            backgroundColor:'$green300',
            borderRadius:'50%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            position:'absolute',
            right:'-5px',
            top:'-5px',
        },
    
        padding:'1rem',
        backgroundColor:'$gray800',
        borderRadius:'6px',
    },
   

   
})