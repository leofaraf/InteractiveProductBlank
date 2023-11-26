import { useContext } from "react";
import { ParserContext } from "../../ParserProvider";

const HeadList = (props) => {
    const element = props.element;
    const context = useContext(ParserContext);

    return (
        <div className="flex flex-wrap head-list">
            {element && element.data && element.data.map((x) => {
                return (
                    <>
                    {context.parse_element(x)}
                    </>
                )
            })}
        </div>
    )
}

export default HeadList;