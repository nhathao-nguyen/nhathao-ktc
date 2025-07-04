import Section from "./components/Lesson03/Group/SectionComponents";
import ButtonClickCounter from "./components/Lesson05/ButtonClickCounter/ButtonClickCounter";
import CheckboxToggle from "./components/Lesson05/CheckboxToggle/CheckboxToggle";
import DoubleClickMessage from "./components/Lesson05/DoubleClickMessage/DoubleClickMessage";
import DropdownSelection from "./components/Lesson05/DropdownSelection/DropdownSelection";
import FormSubmit from "./components/Lesson05/FormSubmissionAlert/FormSubmissionAlert";
import HoverHighlight from "./components/Lesson05/HoverHighlight/HoverHighlight";
import InputTracker from "./components/Lesson05/InputFieldTracker/InputFieldTracker";
import KeyPressDisplay from "./components/Lesson05/KeyPressDisplay/KeyPressDisplay";
import SearchFilter from "./components/Lesson05/SearchFilter/SearchFilter";
import ToggleSwitch from "./components/Lesson05/ToggleSwitch/ToggleSwitch";

function App() {
  return (
    <div>
      <Section>
        <ButtonClickCounter />
      </Section>
      <Section>
        <InputTracker />
      </Section>
      <Section>
        <ToggleSwitch />
      </Section>
      <Section>
        <HoverHighlight />
      </Section>
      <Section>
        <FormSubmit />
      </Section>
      <Section>
        <KeyPressDisplay />
      </Section>
      <Section>
        <DoubleClickMessage />
      </Section>
      <Section>
        <DropdownSelection />
      </Section>
      <Section>
        <CheckboxToggle />
      </Section>
      <Section>
        <SearchFilter />
      </Section>
    </div>
  );
}

export default App;
