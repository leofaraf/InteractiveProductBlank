import { useContext } from "react";
import { ParserContext } from "../../ParserProvider";

const HeadList = (props) => {
    const element = props.element;
    const context = useContext(ParserContext);

    return (
        <div className="flex flex-wrap">
            {element && element.data && element.data.map((x) => {
                return (
                    <div className="w-1/2">
                        {context.parse_element(x)}
                    </div>
                )
            })}
        </div>
    )
}

export default HeadList;