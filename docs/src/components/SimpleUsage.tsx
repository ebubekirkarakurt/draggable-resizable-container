import { reactCode, vanillaCode } from "./data"
import CodeBlock from "./public/CodeBlock"
import Description from "./public/Description"
import Title from "./public/Title"
import "./styles/SimpleUsage.css"

export default function SimpleUsage() {
  return (
    <div className="main" id="SimpleUsage"> 
        <Title title="🔧 Simple Usage" />
        <Description  description="The following code excerpt demonstrates a basic usage example:" />
         <div id="SimpleUsageReact" >
            <Description  description="> React:"/>
        </div>
        
        <CodeBlock code={reactCode} /> 
        <div id="SimpleUsageVanilla" >
            <Description  description="> Vanilla.Js:" />
        </div>

        <CodeBlock code={vanillaCode} /> 
    </div>
  )
}
