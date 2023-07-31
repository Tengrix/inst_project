import type {Meta, StoryObj} from '@storybook/react'
import Select from "@/shared/ui/select/Select";


const meta = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>


export const SelectExample: Story = {
    args: {
        selectLabel:'Language',
        placeHolder: 'Choose language',
        // onValueChange: (item:string)=>console.log(item),
        items: [{title: 'rus'}, {title: 'eng'}],
        // disabled:true
    },
}
