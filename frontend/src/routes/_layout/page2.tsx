import { createFileRoute } from '@tanstack/react-router'


import {
  Button,
  Field,
  HStack,
  Portal,
  RadioGroup,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { data1Data1Get, data2Data2Get, data3Data3Get } from '@/client'
import { useState } from 'react'

const formSchema = z.object({
  framework: z.array(z.string({ message: "必要１" })).nonempty({ message: "必要１" }),
  selected: z.string({ message: "必要２" }),
  value: z.string({ message: "必要３" }),
})

type FormValues = z.infer<typeof formSchema>
export const Route = createFileRoute('/_layout/page2')({
  component: RouteComponent,
  loader: async () => {
    const data = await data3Data3Get()
    return data.data
  },
  errorComponent: (error) => <div>{error.error.message}</div>,
})

function RouteComponent() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const selectData3 = Route.useLoaderData()
  // console.log(selectData)
  const frameworks = createListCollection({
    items: selectData3 as Iterable<any>,
    // select label customize
    itemToString: (item) => "label:" + item.name,
    // select value customize
    itemToValue: (item) => item.value + "ing",
  })
  const [selectData, setSelectData] = useState()
  const selection = createListCollection({ items: selectData || [] })
  console.log(frameworks.items)
  const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Field.Root invalid={!!errors.framework} width="320px">
          <Field.Label>Framework</Field.Label>
          <Controller
            control={control}
            name="framework"
            render={({ field }) => (
              <Select.Root
                name={field.name}
                value={field.value}
                invalid={!!errors.framework}
                onValueChange={({ value }) => {
                  field.onChange(value)
                  if (value.includes("data1ing")) {
                    console.log("data1ing")
                    data1Data1Get().then((data) => {
                      console.log(data)
                      setSelectData(data.data)
                    })
                  } else {
                    console.log("data1ing")
                    data2Data2Get().then((data) => {
                      console.log(data)
                      setSelectData(data.data)
                    })
                  }
                }}
                onInteractOutside={() => field.onBlur()}
                collection={frameworks}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select framework" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {frameworks.items.map((framework) => (
                        <Select.Item item={framework} key={framework.value}>
                          {framework.name}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          <Field.ErrorText>
            {errors.framework?.message === "Required" ? "必要１" : errors.framework?.message}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.selected} width="320px">
          <Field.Label>selected</Field.Label>
          <Controller
            control={control}
            name="selected"
            render={({ field }) => (
              <Select.Root
                name={field.name}
                value={[field.value]}
                onValueChange={({ value }) => {
                  field.onChange(value)
                }
                }
                onInteractOutside={() => field.onBlur()}
                collection={frameworks}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select framework" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {selection.items.map((framework) => (
                        <Select.Item item={framework} key={framework.value}>
                          {framework.name}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          <Field.ErrorText>{errors.selected?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.value} width="320px">
          <Field.Label>value</Field.Label>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  field.onChange(value)
                }}
              >
                <HStack gap="6">
                  {items.map((item) => (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            )}
          />
          <Field.ErrorText>{errors.value?.message}</Field.ErrorText>
        </Field.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
const items = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
]
// const frameworks = createListCollection({
//   items: [
//     { label: "React.js", value: "react" },
//     { label: "Vue.js", value: "vue" },
//     { label: "Angular", value: "angular" },
//     { label: "Svelte", value: "svelte" },
//   ],
// })