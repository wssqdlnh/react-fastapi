import { createFileRoute } from '@tanstack/react-router'
import { Table, Text, Flex, Button } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'

export const Route = createFileRoute('/_layout/page4')({
  component: test
})

function test() {
  return (
    <Flex direction="column" gap={8} p={4}>
      <ColorModeButton />
      <Text fontSize="xl" fontWeight="bold">テーブルコンポーネント属性デモ</Text>

      {/* rowSpanデモ */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>属性</Table.ColumnHeader>
            <Table.ColumnHeader>効果</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>rowSpan=1</Table.Cell>
            <Table.Cell rowSpan={1}>単一行セル</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>rowSpan=2</Table.Cell>
            <Table.Cell rowSpan={2}>2行にまたがるセル</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2行目の内容</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {/* colSpanデモ */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>属性</Table.ColumnHeader>
            <Table.ColumnHeader>効果</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>colSpan=1</Table.Cell>
            <Table.Cell colSpan={1}>単一列セル1</Table.Cell>
            <Table.Cell colSpan={1}>単一列セル2</Table.Cell>
            <Table.Cell colSpan={1}>単一列セル3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>colSpan=2</Table.Cell>
            <Table.Cell colSpan={2}>2列にまたがるセル</Table.Cell>
            <Table.Cell colSpan={1}>単一列セル4</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {/* whiteSpaceデモ */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>属性</Table.ColumnHeader>
            <Table.ColumnHeader>効果</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>whiteSpace="normal"</Table.Cell>
            <Table.Cell whiteSpace="normal">{"通常の改行テキスト これは長いテキストで自動的に改行されます"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>whiteSpace="nowrap"</Table.Cell>
            <Table.Cell whiteSpace="nowrap">{"改行しないテキスト これは長いテキストで改行されません"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>whiteSpace="pre"</Table.Cell>
            <Table.Cell whiteSpace="pre">{"空白    と改行を保持\r\nこのように"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {/* textAlignデモ */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>属性</Table.ColumnHeader>
            <Table.ColumnHeader>効果</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>textAlign="left"</Table.Cell>
            <Table.Cell textAlign="left">左揃えテキスト</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>textAlign="center"</Table.Cell>
            <Table.Cell textAlign="center">中央揃えテキスト</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>textAlign="right"</Table.Cell>
            <Table.Cell textAlign="right">右揃えテキスト</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {/* showColumnBorderデモ */}
      <Table.Root showColumnBorder>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>属性</Table.ColumnHeader>
            <Table.ColumnHeader>効果</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>showColumnBorderある</Table.Cell>
            <Table.Cell>縦罫線ある</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>属性</Table.ColumnHeader>
            <Table.ColumnHeader>効果</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>showColumnBorderなし</Table.Cell>
            <Table.Cell>縦罫線なし</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {/* stickyHeaderデモ */}
      <Table.ScrollArea h={"200px"}>
        <Table.Root stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>属性</Table.ColumnHeader>
              <Table.ColumnHeader>効果</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>stickyHeaderある</Table.Cell>
              <Table.Cell>粘着性のヘッダー</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>stickyHeaderある</Table.Cell>
              <Table.Cell>粘着性のヘッダー</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>stickyHeaderある</Table.Cell>
              <Table.Cell>粘着性のヘッダー</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>stickyHeaderある</Table.Cell>
              <Table.Cell>粘着性のヘッダー</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Table.ScrollArea h={"200px"}>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>属性</Table.ColumnHeader>
              <Table.ColumnHeader>効果</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>stickyHeaderなし</Table.Cell>
              <Table.Cell>デフォルトのヘッダー</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>stickyHeaderなし</Table.Cell>
              <Table.Cell>デフォルトのヘッダー</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>stickyHeaderなし</Table.Cell>
              <Table.Cell>デフォルトのヘッダー</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>stickyHeaderなし</Table.Cell>
              <Table.Cell>デフォルトのヘッダー</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Flex>
  )
}