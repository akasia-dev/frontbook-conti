export interface PackNode {
  w: number
  h: number
  x?: number
  y?: number
  used?: boolean
  right?: PackNode
  down?: PackNode
  fit?: PackNode
}

export interface InputNode {
  w: number
  h: number
}
export interface ResultNode {
  x: number
  y: number
  w: number
  h: number
}

export const rectanglePack = <T>(props: {
  w: number
  h: number
  nodes: (InputNode & T)[]
}) => {
  const root: PackNode = { x: 0, y: 0, w: props.w, h: props.h }

  const findNode = (node: PackNode | undefined, w: number, h: number) => {
    if (node) {
      if (node.used)
        return findNode(node.right, w, h) || findNode(node.down, w, h)
      else if (w <= node.w && h <= node.h) return node
      else return null
    } else {
      return null
    }
  }

  const splitNode = (node: PackNode | undefined, w: number, h: number) => {
    if (node) {
      node.used = true
      node.down = { x: node.x, y: node.y! + h, w: node.w, h: node.h - h }
      node.right = { x: node.x! + w, y: node.y, w: node.w - w, h: h }
    }
    return node
  }

  const blocks = [...props.nodes] as any

  let node: PackNode
  let block: PackNode
  for (let n = 0; n < blocks.length; n++) {
    block = blocks[n]
    if ((node = findNode(root, block.w, block.h)))
      block.fit = splitNode(node, block.w, block.h)
  }

  const result: (ResultNode & T)[] = blocks.map((block) => {
    return {
      ...block,
      x: block.fit!.x!,
      y: block.fit!.y!,
      w: block.w,
      h: block.h
    }
  })

  return result
}
