import type {
  IContiComponent,
  IContiPositionData
} from 'components/conti/interface'

console.log('injection is possible?')
const componentGenerate = () => {
  return {
    title: 'CategoryList',
    component: function CategoryListEx(props) {},
    code: (props, propTypes) => {
      return ``
    },
    props: {
      isModify: {
        type: 'boolean',
        defaultValue: false
      }
    }
  }
}

/**
 * Write the component location information here.
 * It can get it after modifying it within the page.
 */
export const positions: IContiPositionData[] = JSON.parse(`[]`)

/**
 * Write the component specifications here.
 */
export const components: IContiComponent[] = []
