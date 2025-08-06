import React from 'react';
import Title from './public/Title';
import Description from './public/Description';
import './styles/Props.css'; 

export default function Props() {
  return  (
    <div id="Props" style={{ padding: "1rem" }}>
      <Title title="🧱 Props" />
      <Description description="The DraggableResizableContainer component can be easily customized using the following props. You can provide dynamic data, configure refresh intervals, and define interactions." />

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
              <td><code>Array&lt;{"{ id, label, buttons: Button[] }"}&gt;</code></td>
              <td>Contains data for each draggable container box</td>
            </tr>
            <tr>
              <td><code>pollingInterval</code></td>
              <td><code>number</code></td>
              <td>Optional. Interval for refetching data (in milliseconds). Default: <code>1000</code></td>
            </tr>
            <tr>
              <td><code>onButtonStageChanged</code></td>
              <td>
                <code>
                  ({'{'} containerId: string, buttonId: string, stageIndex: number {'}'}) =&gt; void
                </code>
              </td>
              <td>Triggered when any button is clicked and its stage is updated</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
