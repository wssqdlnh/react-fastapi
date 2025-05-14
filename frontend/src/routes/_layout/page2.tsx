import { createFileRoute } from '@tanstack/react-router'


import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
  RadioGroup,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useController, useForm } from "react-hook-form"
import { z } from "zod"
import { data1Data1Get, data2Data2Get, data3Data3Get } from '@/client'
import { useState } from 'react'

const formSchema = z.object({
  framework: z.array(z.string()).optional().refine(val => !!val, { message: "必須項目です" }),
  selected: z.array(z.string()).optional().refine(val => !!val, { message: "必須項目です" }),
  value: z.string({ message: "必要３" }),
  v1: z.string().optional(),
  v2: z.string().optional(),
  v3: z.string().optional(),
  d1: z.string().optional(),
  d2: z.string().optional(),
  d3: z.string().optional(),
  ckb: z.string().array().optional(),
  vv: z.undefined(), // v1、v2、v3重複チェックのタイプチェック用
  dd: z.undefined(),// d1、d2、d3重複チェックのタイプチェック用
})
  // vシリーズの重複チェック
  .refine(data => {
    const vValues = [data.v1, data.v2, data.v3]
      .filter(v => v !== undefined && v !== ''); // 空文字とundefinedを除外
    return vValues.length === new Set(vValues).size; // 重複しているかチェック
  }, { message: "v1、v2、v3 には重複した値を入力できません", path: ["vv"] })

  // dシリーズの重複チェック
  .refine(data => {
    const dValues = [data.d1, data.d2, data.d3]
      .filter(d => d !== undefined && d !== ''); // 空文字とundefinedを除外
    return dValues.length === new Set(dValues).size; // 重複しているかチェック
  }, { message: "d1、d2、d3 には重複した値を入力できません", path: ["dd"] });


export const Route = createFileRoute('/_layout/page2')({
  component: RouteComponent,
  loader: async () => {
    const res = await data3Data3Get()
    if (res.status !== 200) {
      throw new Error("status!==200")
    }
    return res.data ? res.data : []
  },
  errorComponent: (error) => <div>error:{error.error.message}</div>,
  pendingComponent: () => <div>loading...</div>,
})

function RouteComponent() {
  // データ取得
  const selectData3 = Route.useLoaderData()
  // フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
  })
  // チェックボックス
  const ckb = useController({
    name: "ckb",
    control: control,
    defaultValue: [],
  })
  const frameworks = createListCollection({
    items: selectData3 as Iterable<any>,
    // select label customize
    itemToString: (item) => "label:" + item.name,
    // select value customize
    itemToValue: (item) => item.value + "ing",
  })
  const [selectData, setSelectData] = useState()
  const selection = createListCollection<any>({ items: selectData || [] })
  const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Field.Root invalid={!!errors.framework} width="320px">
          <Field.Label>Framework</Field.Label>
          <Controller
            control={control}
            name="framework"
            rules={{ required: 'Controller required' }}
            render={({ field }) => (
              <Select.Root
                name={field.name}
                value={field.value}
                invalid={!!errors.framework}
                onValueChange={({ value }) => {
                  field.onChange(value)
                  if (value.includes("data1ing")) {
                    data1Data1Get().then((data) => {
                      setSelectData(data.data as any)
                    })
                  } else {
                    data2Data2Get().then((data) => {
                      setSelectData(data.data as any)
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
          <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.selected} width="320px">
          <Field.Label>selected</Field.Label>
          <Controller
            control={control}
            name="selected"
            render={({ field }) => (
              <Select.Root
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  field.onChange(value)
                }
                }
                onInteractOutside={() => field.onBlur()}
                collection={selection}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="selected" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {selection.items.map((selData) => (
                        <Select.Item item={selData} key={selData.value}>
                          {selData.name}
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
        <Field.Root invalid={!!errors.vv?.message} width="320px">
          <Field.Label>v</Field.Label>
          <Input {...register("v1")} />
          <Input {...register("v2")} />
          <Input {...register("v3")} />
          <Field.ErrorText>{errors.vv?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.dd?.message} width="320px">
          <Field.Label>d</Field.Label>
          <Input {...register("d1")} />
          <Input {...register("d2")} />
          <Input {...register("d3")} />
          <Field.ErrorText>{errors.dd?.message}</Field.ErrorText>
        </Field.Root>
        <Fieldset.Root invalid={!!errors.ckb?.message}>
          <Fieldset.Legend>Select your framework</Fieldset.Legend>
          <CheckboxGroup
            value={ckb.field.value}
            onValueChange={ckb.field.onChange}
            name={ckb.field.name}
          >
            <Fieldset.Content>
              {items.map((item) => (
                <Checkbox.Root key={item.value} value={item.value}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{item.label}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Fieldset.Content>
          </CheckboxGroup>

          {errors.ckb && (
            <Fieldset.ErrorText>{errors.ckb.message}</Fieldset.ErrorText>
          )}
        </Fieldset.Root>
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