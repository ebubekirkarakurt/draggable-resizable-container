import Description from "./public/Description"
import Title from "./public/Title"
import "./styles/SimpleUsage.css"

export default function SimpleUsage() {
  return (
    <div className="main">
        <Title title="Simple Usage" />
        <Description  description="The following code excerpt demonstrates a basic usage example:" />
    </div>
  )
}
