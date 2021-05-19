import React, {useEffect} from 'react'
import {Button, Image} from "react-bootstrap";
import FILE from "../../icon/file.webp";
import lock from "../../icon/lock.png";
import {fetchPresentation} from "../../redux/store/action_creator/sliderAC";
import {NavLink} from "react-router-dom";
import {getPresentation} from "../../redux/store/action_creator/presentationAC";
import {useDispatch, useSelector} from "react-redux";
import './PresentMap.css'


const PresentMap = () =>{

    const {Presentation} = useSelector((state) => state.presentation);
    const [modalShare, setModalShare] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getPresentation(1))
    }, []);

    return (
        <div>
            {
                Presentation.map((e, i) => {
                    return (
                        <tr key={e.id} className={"control_hover"}>
                            <th>{
                                e.presentation_file[0].path.endsWith('.png')?<Image className="mr-2 rounded" width="45px"
                                                                                    src={`${process.env.REACT_APP_API_URL}${e.presentation_file[0].path}`} />
                                    :<Image className="mr-2 rounded" width="45px"
                                            src={FILE}  />
                            }
                            </th>
                            <td >{e.title}
                                {e.is_private ?
                                    <Image width={"40px"} src={lock}/> : ""
                                }
                                <div><small>  {e.presentation_file[0].mime.split('/')[1]}</small></div>
                            </td>
                            <td>{
                                new Date(e.createdAt).toLocaleString('en-us', { month: 'short',day: "2-digit"})
                            }</td>
                            <td className={"d-flex"}>
                                {Math.round(e.presentation_file[0].size/1000)+''+ 'KB'}
                                <Button onClick={()=>{dispatch(fetchPresentation(e.secret_key))}} variant="outline-dark" className="ml-5  h-25 pt-1 pb-1 control_buttons mr-2">
                                    <NavLink to={"/w/"+e.secret_key}  style={{textDecoration: 'none',color:'grey'}} > View</NavLink>
                                </Button>
                                <Button className={"pt-1 pb-1 control_buttons h-25"} variant="outline-dark"
                                        onClick={() => setModalShare(true)}>Share</Button>
                            </td>
                        </tr>
                    )
                })
            }
        </div>
    )
}
export default PresentMap