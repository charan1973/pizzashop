import { Helmet } from "react-helmet";

const Head = ({title}) => {
    return ( 
        <Helmet>
            <title>Pizzetta - {title}</title>
        </Helmet>
     );
}
 
export default Head;