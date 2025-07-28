import React from 'react';
import Title from './public/Title';
import Description from './public/Description';
import './styles/Props.css'; 

export default function Props() {
  return (
    <div id="Props">
      <Title title="🧱 Props" />
      <Description description="The DraggableResizableContainer component can be easily customized using the following props. You can provide dynamic data, add a custom alert sound, and define interactions for user clicks." />
      
      <div className="props-table-wrapper">
        <table className="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data</code></td>
              <td><code>Array&lt;{"{ id, title, alarmStatus }"}&gt;</code></td>
              <td>Data to render inside each box</td>
            </tr>
            <tr>
              <td><code>soundSrc</code></td>
              <td><code>string</code></td>
              <td>Path to the alert sound (optional)</td>
            </tr>
            <tr>
              <td><code>onBoxClick</code></td>
              <td><code>(id: number &#124; string) =&gt; void</code></td>
              <td>Callback when a box is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
