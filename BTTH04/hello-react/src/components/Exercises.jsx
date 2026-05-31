import Tier0 from '../exercises_v2/TIER_0_first_component';
import Tier1 from '../exercises_v2/TIER_1_react_flow';
import Tier2 from '../exercises_v2/TIER_2_jsx_variables';
import Tier3 from '../exercises_v2/TIER_3_component_split';
import Tier4 from '../exercises_v2/TIER_4_useState_basics';
import Tier5 from '../exercises_v2/TIER_5_events_basics';
import Tier6 from '../exercises_v2/TIER_6_lists_crud';
import Tier7 from '../exercises_v2/TIER_7_todo_app';

function Exercises() {
  return (
    <section id="exercises" style={{ padding: '32px 0' }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', textAlign: 'left' }}>
        <h2>Exercises (Tiers 0–7)</h2>
        <div className="exercise-grid" style={{ display: 'grid', gap: 24 }}>
          <Tier0 />
          <Tier1 />
          <Tier2 />
          <Tier3 />
          <Tier4 />
          <Tier5 />
          <Tier6 />
          <Tier7 />
        </div>
      </div>
    </section>
  );
}

export default Exercises;
