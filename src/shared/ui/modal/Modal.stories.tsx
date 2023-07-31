import type {Meta, StoryObj} from '@storybook/react'
import {Modal} from "@/shared/ui/modal/Modal";
import {Button} from "@/shared/ui/button";


const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>


export const ModalExample: Story = {
  args: {
    title: "Modal title",
    modalTrigger: (<Button>Trigger button</Button>) ,
    children: (<div>This is modal window content</div>)
  },
}
