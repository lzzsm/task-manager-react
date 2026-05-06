import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

// vi.mock é hoistado automaticamente pelo Vitest para antes dos imports,
// por isso funciona mesmo estando declarado depois dos imports no código.
vi.mock("uuid", () => ({ v4: vi.fn(() => "id-1") }));
vi.mock("../constants/storage", () => ({ STORAGE_KEY: "tasks_test" }));

// Importações depois dos mocks para garantir que o módulo já foi interceptado
import { useTasks } from "./useTasks";
import { v4 as uuidv4 } from "uuid";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTask(overrides = {}) {
  return {
    id: "id-1",
    title: "Tarefa teste",
    description: "Descrição teste",
    expirationDate: "2099-12-31",
    isCompleted: false,
    ...overrides,
  };
}

function seedStorage(tasks) {
  localStorage.setItem("tasks_test", JSON.stringify(tasks));
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  uuidv4.mockReturnValue("id-1");
});

// ---------------------------------------------------------------------------
// Testes
// ---------------------------------------------------------------------------

describe("useTasks — estado inicial", () => {
  it("retorna lista vazia quando localStorage está vazio", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it("carrega tarefas salvas do localStorage", () => {
    seedStorage([makeTask()]);

    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("Tarefa teste");
  });

  it("retorna lista vazia se localStorage estiver corrompido", () => {
    localStorage.setItem("tasks_test", "json-invalido{{{");

    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual([]);
  });
});

describe("useTasks — onTaskAdd", () => {
  it("adiciona uma nova tarefa com os campos corretos", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskAdd("Título", "Descrição", "2099-12-31");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toMatchObject({
      id: "id-1",
      title: "Título",
      description: "Descrição",
      expirationDate: "2099-12-31",
      isCompleted: false,
    });
  });

  it("adiciona múltiplas tarefas preservando as anteriores", () => {
    uuidv4.mockReturnValueOnce("id-1").mockReturnValueOnce("id-2");
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskAdd("Tarefa 1", "Desc 1", "2099-01-01");
      result.current.onTaskAdd("Tarefa 2", "Desc 2", "2099-02-01");
    });

    expect(result.current.tasks).toHaveLength(2);
  });

  it("persiste a tarefa adicionada no localStorage", async () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskAdd("Título", "Descrição", "2099-12-31");
    });

    // useEffect é assíncrono — waitFor aguarda o localStorage ser atualizado
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem("tasks_test"));
      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe("Título");
    });
  });
});

describe("useTasks — onTaskToggle", () => {
  it("marca uma tarefa pendente como concluída", () => {
    seedStorage([makeTask({ isCompleted: false })]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskToggle("id-1");
    });

    expect(result.current.tasks[0].isCompleted).toBe(true);
  });

  it("marca uma tarefa concluída como pendente", () => {
    seedStorage([makeTask({ isCompleted: true })]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskToggle("id-1");
    });

    expect(result.current.tasks[0].isCompleted).toBe(false);
  });

  it("só altera a tarefa alvo, não as demais", () => {
    seedStorage([
      makeTask({ id: "id-1", title: "T1" }),
      makeTask({ id: "id-2", title: "T2" }),
    ]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskToggle("id-1");
    });

    const t1 = result.current.tasks.find((t) => t.id === "id-1");
    const t2 = result.current.tasks.find((t) => t.id === "id-2");
    expect(t1.isCompleted).toBe(true);
    expect(t2.isCompleted).toBe(false);
  });
});

describe("useTasks — onTaskDelete", () => {
  it("remove a tarefa correta da lista", () => {
    seedStorage([
      makeTask({ id: "id-1", title: "T1" }),
      makeTask({ id: "id-2", title: "T2" }),
    ]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskDelete("id-1");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe("id-2");
  });

  it("não quebra ao tentar remover id inexistente", () => {
    seedStorage([makeTask()]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskDelete("id-inexistente");
    });

    expect(result.current.tasks).toHaveLength(1);
  });
});

describe("useTasks — onTaskEdit", () => {
  it("atualiza os campos da tarefa correta", () => {
    seedStorage([makeTask()]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskEdit(
        "id-1",
        "Novo título",
        "Nova descrição",
        "2099-06-15",
      );
    });

    const task = result.current.tasks[0];
    expect(task.title).toBe("Novo título");
    expect(task.description).toBe("Nova descrição");
    expect(task.expirationDate).toBe("2099-06-15");
  });

  it("preserva isCompleted e id ao editar", () => {
    seedStorage([makeTask({ isCompleted: true })]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskEdit(
        "id-1",
        "Novo título",
        "Nova descrição",
        "2099-06-15",
      );
    });

    const task = result.current.tasks[0];
    expect(task.isCompleted).toBe(true);
    expect(task.id).toBe("id-1");
  });

  it("não altera outras tarefas ao editar uma", () => {
    seedStorage([
      makeTask({ id: "id-1", title: "T1" }),
      makeTask({ id: "id-2", title: "T2" }),
    ]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskEdit("id-1", "T1 editada", "Desc", "2099-01-01");
    });

    const t2 = result.current.tasks.find((t) => t.id === "id-2");
    expect(t2.title).toBe("T2");
  });
});

describe("useTasks — ordenação", () => {
  it("tarefas pendentes aparecem antes das concluídas", () => {
    seedStorage([
      makeTask({ id: "id-1", title: "Concluída", isCompleted: true }),
      makeTask({ id: "id-2", title: "Pendente", isCompleted: false }),
    ]);
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks[0].title).toBe("Pendente");
    expect(result.current.tasks[1].title).toBe("Concluída");
  });

  it("ao concluir uma tarefa ela vai para o fim da lista", () => {
    seedStorage([
      makeTask({ id: "id-1", title: "T1", isCompleted: false }),
      makeTask({ id: "id-2", title: "T2", isCompleted: false }),
    ]);
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.onTaskToggle("id-1");
    });

    expect(result.current.tasks[0].id).toBe("id-2");
    expect(result.current.tasks[1].id).toBe("id-1");
  });
});
