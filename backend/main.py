from datetime import datetime
from io import BytesIO
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openpyxl import load_workbook

app = FastAPI(servers=[{"url": "http://localhost:8000"}])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    expose_headers=["Content-Disposition"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/excel")
def get_gyomu_keireki_excel(
):
    return getgyoumuRirekiExcel()
def getgyoumuRirekiExcel():
    wb = load_workbook(filename = '.\\public\\gyomuKeirekiList.xlsx')
    sheet = wb["Sheet1"]
    sheet["A1"] = datetime.now()
    io = BytesIO()
    wb.save(io)
    io.seek(0)
    return StreamingResponse(
        content=io,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=myExcel.xlsx"}
     )
@app.get("/data1")
def data1():
    return [
  { "name": "React", "value": "react" },
  { "name": "Vue", "value": "vue" },
  { "name": "Angular", "value": "angular" },
  { "name": "SolidJS", "value": "solidjs" },
  { "name": "Qwik", "value": "qwik" },
  { "name": "TypeScript", "value": "typescript" },
  { "name": "JavaScript", "value": "javascript" },
  { "name": "Next.js", "value": "nextjs" },
  { "name": "Nuxt.js", "value": "nuxtjs" },
  { "name": "Astro", "value": "astro" }
]
@app.get("/data2")
def data2():
    return [
  {"name": "React Core", "value": "react-core"},
  {"name": "React Hooks", "value": "react-hooks"},
  {"name": "React Router", "value": "react-router"},
  {"name": "React Context", "value": "react-context"},
  {"name": "React Fiber", "value": "react-fiber"},
  {"name": "React DOM", "value": "react-dom"},
  {"name": "React Native", "value": "react-native"},
  {"name": "React Suspense", "value": "react-suspense"},
  {"name": "React Memo", "value": "react-memo"},
  {"name": "React Portal", "value": "react-portal"},
  {"name": "React Refs", "value": "react-refs"},
  {"name": "React State", "value": "react-state"},
  {"name": "React Props", "value": "react-props"},
  {"name": "React JSX", "value": "react-jsx"},
  {"name": "React Virtual DOM", "value": "react-vdom"},
  {"name": "React Component", "value": "react-component"},
  {"name": "React Lifecycle", "value": "react-lifecycle"},
  {"name": "React Fragment", "value": "react-fragment"},
  {"name": "React Error Boundary", "value": "react-error-boundary"},
  {"name": "React Lazy", "value": "react-lazy"},
  {"name": "React Concurrent", "value": "react-concurrent"},
  {"name": "React Server Components", "value": "react-server"},
  {"name": "React Hydration", "value": "react-hydration"},
  {"name": "React Reconciliation", "value": "react-reconciliation"},
  {"name": "React Synthetic Event", "value": "react-synthetic"},
  {"name": "React Custom Hook", "value": "react-custom-hook"},
  {"name": "React Higher-Order Component", "value": "react-hoc"},
  {"name": "React Render Props", "value": "react-render-props"},
  {"name": "React Strict Mode", "value": "react-strict-mode"},
  {"name": "React Profiler", "value": "react-profiler"}
]

@app.get("/data3")
def data3():
    return [
  { "name": "Data1", "value": "data1" },
  { "name": "Data2", "value": "data2" },
]
@app.get("/radio")
def radio():
    return [
  { "value": "1", "label": "Option 1" },
  { "value": "2", "label": "Option 2" },
  { "value": "3", "label": "Option 3" },
]