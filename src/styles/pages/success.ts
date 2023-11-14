import { styled } from "..";

export const SuccessContainer = styled('main', {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    margin:'0px auto',
    height:'656px',

    h1: {
        fontSize:'$2xl',
        color:'$gray100',
    },

    p: {
        fontSize:'$xl',
        color:'$gray300',
        maxWidth:'560px',
        textAlign:'center',
        marginTop:'2rem',
        lineHeight:'1.4',
    },

    a: {
        display:'block',
        marginTop:'5rem',
        fontSize:'$lg',
        color:'$green500',
        textDecoration:'none',
        fontWeight:'bold',

        '&:hover': {
          color:'$green300',
        }
    },

    section: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        '& > *:not(:first-child)': {
            marginLeft: '-50px',  
        }
    }
})

export const SuccessImageContainer = styled('div', {
    
    width:'130px',
    height:'130px',
    marginTop:'4rem',
    margin:'0px',
    position:'relative',

    background:'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)', 
    borderRadius:'50%',
    padding:'0.25rem',

    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    
    img: {
        objectFit:'cover'
    }
})