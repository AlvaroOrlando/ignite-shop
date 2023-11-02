import { styled } from "..";

export const HomeContainer = styled('main',{
    display:'flex',
    gap:'3rem',
    width:'100%',

    maxWidth:'calc(100vw - ((100vw - 1180px) / 2 ))',
    minHeight:'656px',

    marginLeft:'auto',
})

export const Product = styled('div',{
    position:'relative',
    padding:'0.25rem',

    background:'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)', 
    borderRadius:8,

    cursor: 'pointer',

    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    overflow:'hidden',

    img: {
        objectFit:'cover'
    },

    '&:hover':{
        footer: {
            transform:'translateY(0%)',
            opacicity:'1',
        }
    }

})


export const Footer = styled('footer', {
    position:'absolute',
    bottom:'0.25rem',
    left:'0.25rem',
    right:'0.25rem',

    padding:'2rem',
    borderRadius:'6px',

    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',

    backgroundColor:'rgba(0, 0 , 0 , 0.6)',

    transform:'translateY(110%)',
    opacity:'0px',
    transition:'all 0.2s ease-in-out',

    strong: {
        fontSize:'$lg',
        color:'$gray100'
    },

    span: {
        fontSize:'$xl',
        fontWeight:'bold',
        color:'$green300',
        display:'block',
        marginTop:'0.5rem'
    },

    section: {
        backgroundColor:'$green300',
        width:'3.5rem',
        height:'3.5rem',
        borderRadius:'6px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }

})


