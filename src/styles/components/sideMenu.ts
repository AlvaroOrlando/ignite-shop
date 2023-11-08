import { styled } from '..';

export const CustomOffcanvasCloseButton = styled('button', {
  color:'$gray300',
  border:'none', 
  backgroundColor:'transparent',
  fontSize:'$2xl',
  position:'absolute',
  right:'1.5rem',
  top:'0.5rem',
});

export const Products = styled('div',{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    gap:'1.25rem',
})

export const CustomOffcanvasTitle = styled('div', {
    marginTop:'4.5rem',
    fontSize:'$lg',
    fontWeight:'bold',
    lineHeight:'160%',
    padding:'1rem'
})

export const ProductContainer = styled('div', {
    width:"100",
    height:'94px',
    display:'flex',
    alignItems:'center',
    gap:'1.25rem',
})

export const ProductImageContainer = styled('div', {
    background:'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)', 
    height:'100%',
    width:'6.375rem ',
    borderRadius:'8px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    img: {
        objectFit:'cover'
    }
})

export const ProductDescriptionContainer = styled('div', {

    display:'flex',
    flexDirection:'column',

    h1: {
        fontSize:'$md',
        lineHeight:'160%',
        marginBottom:'0px'
    },

    span: {
        fontWeight:'bold',
        lineHeight:'160%',
        fontSize:'$md',
    },

    button: {
        border: '0px',
        outline:'none',
        background:'transparent',
        color:'$green500',
        fontWeight:'bold',
        lineHeight:'160%',
        width:'fit-content'
    }
})

export const CustomOffcanvasFooter = styled('div', {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    gap:'3rem',

    padding:'1rem',
    width:'100%',

    button: {
        width:'100%',
        height:'4.3rem',
        border: '0px',
        outline:'none',
        borderRadius:'8px',
        background:'$green500',
        color:'$white',
        fontWeight:'bold',
        lineHeight:'160%',

        '&:hover': {
            backgroundColor:'$green300'
        },
    }, 

    section: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        gap:'1rem',

        div: {
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',

            '&.quantity':{
                fontSize:'$rg',
            },

            '&.total':{
                div: {
                    fontSize:'$md',
                    fontWeight:'bold'
                },

                span: {
                    fontWeight:'bold',
                    fontSize:'$md',
                }
            }

        }
    }
    



})

