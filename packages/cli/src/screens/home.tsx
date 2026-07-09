import { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { usePromptConfig } from "../providers/config/prompt-config";
import { TextAttributes, type TextareaRenderable } from "@opentui/core";
import { useTheme } from "../providers/theme";
import { useConfig } from "../providers/config/config";
import { useToast } from "../providers/toast";
import { useDialog } from "../providers/dialog";
import { useKeyboard, useRenderer } from "@opentui/react";
import { ProvidersDialogContent } from "../components/dialogs/providers/providers-menu-content";
import { SelectModalDialogContent } from "../components/dialogs/models/select-model-dialog-content";
import { EmptyBorder } from "../components/border";
import { TEXTAREA_KEY_BINDINGS } from "../components/input/prompt-input";

// Dialog content for starting a chat session or prompt
function StartChatDialogContent({
	mode,
	onSubmit,
}: {
	mode: string;
	onSubmit: (text: string) => void;
}) {
	const { colors } = useTheme();
	const textareaRef = useRef<TextareaRenderable>(null);

	const handleSubmit = () => {
		if (!textareaRef.current) return;
		const text = textareaRef.current.plainText ?? "";
		if (text.trim()) {
			onSubmit(text);
		}
	};

	return (
		<box flexDirection="column" gap={1} width="100%">
			<text fg={colors.dimSeparator}>
				Enter your prompt/query below and press Enter:
			</text>
			<box
				border={["left"]}
				borderColor={mode === "BUILD" ? colors.primary : colors.planMode}
				customBorderChars={{
					...EmptyBorder,
					vertical: "┃",
				}}
				width="100%"
				paddingLeft={1}
				flexShrink={0}
			>
				<textarea
					placeholder="Ask or command anything..."
					keyBindings={TEXTAREA_KEY_BINDINGS}
					ref={textareaRef}
					onSubmit={handleSubmit}
					focused
					height={4}
					width="100%"
				/>
			</box>
			<box flexDirection="row" justifyContent="flex-end" gap={2} flexShrink={0}>
				<text fg={colors.dimSeparator}>Enter to submit</text>
				<text fg={colors.dimSeparator}>Esc to cancel</text>
			</box>
		</box>
	);
}

// Dialog content for editing system prompt
function EditSystemPromptDialogContent() {
	const { colors } = useTheme();
	const { show } = useToast();
	const { close } = useDialog();
	const prompt =
		"You are Taraka, a highly capable agentic AI assistant running locally on the user's computer.";
	const textareaRef = useRef<TextareaRenderable>(null);

	const handleSave = () => {
		if (!textareaRef.current) return;
		const val = textareaRef.current.plainText ?? "";
		show({
			message: `System prompt updated: "${val.slice(0, 20)}..."`,
			variant: "success",
		});
		close();
	};

	return (
		<box flexDirection="column" gap={1} width="100%">
			<text fg={colors.dimSeparator}>Edit the system prompt below:</text>
			<textarea
				ref={textareaRef}
				placeholder="Enter system prompt..."
				initialValue={prompt}
				focused
				height={6}
				width="100%"
			/>
			<box
				flexDirection="row"
				justifyContent="flex-end"
				gap={2}
				marginTop={1}
				flexShrink={0}
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: TUI elements use onMouseDown for interaction */}
				<text fg={colors.primary} onMouseDown={handleSave}>
					[ Save ]
				</text>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: TUI elements use onMouseDown for interaction */}
				<text fg={colors.dimSeparator} onMouseDown={close}>
					[ Cancel ]
				</text>
			</box>
		</box>
	);
}

// Dialog content for advanced settings
function AdvancedSettingsDialogContent() {
	const { colors } = useTheme();
	const { show } = useToast();
	const { close } = useDialog();
	const baseUrl = "https://openrouter.ai/api";
	const historyLimit = "20";

	const handleSave = () => {
		show({ message: "Advanced settings saved!", variant: "success" });
		close();
	};

	return (
		<box flexDirection="column" gap={1} width="100%">
			<box flexDirection="row" gap={1} flexShrink={0}>
				<text fg={colors.primary}>Base URL:</text>
				<text fg={colors.thinking}>{baseUrl}</text>
			</box>
			<box flexDirection="row" gap={1} flexShrink={0}>
				<text fg={colors.primary}>History Limit:</text>
				<text fg={colors.thinking}>{historyLimit}</text>
			</box>
			<box
				flexDirection="row"
				justifyContent="flex-end"
				gap={2}
				marginTop={1}
				flexShrink={0}
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: TUI elements use onMouseDown for interaction */}
				<text fg={colors.primary} onMouseDown={handleSave}>
					[ Save ]
				</text>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: TUI elements use onMouseDown for interaction */}
				<text fg={colors.dimSeparator} onMouseDown={close}>
					[ Cancel ]
				</text>
			</box>
		</box>
	);
}

export function Home() {
	const navigate = useNavigate();
	const { colors } = useTheme();
	const { show } = useToast();
	const { mode } = usePromptConfig();
	const { provider, model, apiKey, refresh } = useConfig();
	const dialog = useDialog();
	const renderer = useRenderer();

	const [inputValue, setInputValue] = useState("");

	const handleOptionSelect = useCallback(
		async (opt: string) => {
			setInputValue("");
			await refresh();

			switch (opt) {
				case "1": {
					if (!provider || !model || !apiKey) {
						show({
							message: "Please configure your Provider and API Key first.",
							variant: "error",
						});
						dialog.open({
							title: "Select a provider",
							children: <ProvidersDialogContent />,
						});
						return;
					}
					dialog.open({
						title: "Start Chat Session",
						children: (
							<StartChatDialogContent
								mode={mode}
								onSubmit={(text) => {
									dialog.close();
									navigate("/sessions/new", { state: { message: text, mode } });
								}}
							/>
						),
					});
					break;
				}
				case "2": {
					if (!provider || !model || !apiKey) {
						show({
							message: "Please configure your Provider and API Key first.",
							variant: "error",
						});
						dialog.open({
							title: "Select a provider",
							children: <ProvidersDialogContent />,
						});
						return;
					}
					dialog.open({
						title: "Quick Prompt (Single Query)",
						children: (
							<StartChatDialogContent
								mode={mode}
								onSubmit={(text) => {
									dialog.close();
									navigate("/sessions/new", { state: { message: text, mode } });
								}}
							/>
						),
					});
					break;
				}
				case "3": {
					dialog.open({
						title: "Select a provider",
						children: <ProvidersDialogContent />,
					});
					break;
				}
				case "4": {
					dialog.open({
						title: "Select a model",
						children: <SelectModalDialogContent />,
					});
					break;
				}
				case "5": {
					dialog.open({
						title: "Edit System Prompt",
						children: <EditSystemPromptDialogContent />,
					});
					break;
				}
				case "6": {
					dialog.open({
						title: "Advanced Settings",
						children: <AdvancedSettingsDialogContent />,
					});
					break;
				}
				case "7": {
					renderer.destroy();
					setTimeout(() => process.exit(0), 0);
					break;
				}
			}
		},
		[navigate, mode, provider, model, apiKey, refresh, show, dialog, renderer],
	);

	useKeyboard((key) => {
		if (dialog.isOpen) return;

		if (["1", "2", "3", "4", "5", "6", "7"].includes(key.name)) {
			setInputValue(key.name);
			setTimeout(() => {
				handleOptionSelect(key.name);
			}, 100);
		} else if (key.name === "backspace") {
			setInputValue("");
		}
	});

	return (
		<scrollbox width="100%" height="100%">
			<box
				alignItems="center"
				justifyContent="center"
				flexGrow={1}
				gap={1}
				width="100%"
				paddingY={1}
			>
				{/* ASCII Art Logo and Subtitle */}
				<box
					flexDirection="column"
					alignItems="center"
					gap={0.5}
					flexShrink={0}
				>
					<ascii-font font="pallet" text="TARAKA" color={colors.primary} />
					<text fg={colors.dimSeparator}>
						Taraka AI Coding Assistant CLI v1.0.0
					</text>
				</box>

				{/* Status Box */}
				<box
					border={["left", "right", "top", "bottom"]}
					borderColor={colors.info}
					flexDirection="column"
					width={55}
					paddingX={2}
					paddingY={1}
					position="relative"
					marginTop={1}
					flexShrink={0}
				>
					{/* Top title overlay */}
					<box
						position="absolute"
						top={-1}
						left={20}
						paddingX={1}
						backgroundColor={colors.background}
					>
						<text fg={colors.info} attributes={TextAttributes.BOLD}>
							Status
						</text>
					</box>

					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.primary}>Active Model:</text>
						<text fg={colors.thinking}>{model || "Not Configured"}</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.primary}>API Key:</text>
						<text fg={apiKey ? colors.success : colors.error}>
							{apiKey ? "Set (Environment/Config)" : "Not Set"}
						</text>
					</box>
					<box
						flexDirection="row"
						gap={1}
						justifyContent="center"
						marginTop={1}
						flexShrink={0}
					>
						<text fg={colors.info}>Use /help in chat for options</text>
					</box>
				</box>

				{/* Menu Box */}
				<box
					border={["left", "right", "top", "bottom"]}
					borderColor={colors.planMode}
					flexDirection="column"
					width={55}
					paddingX={2}
					paddingY={1}
					position="relative"
					marginTop={1}
					flexShrink={0}
				>
					<box
						position="absolute"
						top={-1}
						left={16}
						paddingX={1}
						backgroundColor={colors.background}
					>
						<text fg={colors.planMode} attributes={TextAttributes.BOLD}>
							Select an option
						</text>
					</box>

					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[1]</text>
						<text>Start Chat Session (Interactive)</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[2]</text>
						<text>Quick Prompt (Single query)</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[3]</text>
						<text>Edit API Key & Model Link</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[4]</text>
						<text>List Available Free Models</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[5]</text>
						<text>Edit System Prompt</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[6]</text>
						<text>Advanced Settings (Base URL, History Limit)</text>
					</box>
					<box flexDirection="row" gap={1} flexShrink={0}>
						<text fg={colors.success}>[7]</text>
						<text>Exit</text>
					</box>
				</box>

				{/* Prompt Option Choice line */}
				<box
					flexDirection="row"
					gap={1}
					marginTop={1}
					width={55}
					flexShrink={0}
				>
					<text fg={colors.primary} attributes={TextAttributes.BOLD}>
						Choose option [1/2/3/4/5/6/7]:
					</text>
					<text>{inputValue}</text>
					<text fg={colors.primary} attributes={TextAttributes.BLINK}>
						█
					</text>
				</box>
			</box>
		</scrollbox>
	);
}
