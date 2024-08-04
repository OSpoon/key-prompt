const css = `
:host #key-prompt {
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 99999;
}

#key-prompt .kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: oklch(0.746477 0.0216 264.436 / 0.2);
  background-color: oklch(0.232607 0.013807 253.101);
  padding-left: 8px;
  padding-right: 8px;
  border-bottom-width: 2px;
  min-height: 30px;
  min-width: 20px;
  color: #f5deb3;
}

#key-prompt .container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: transparent;
}

#key-prompt .single {
  display: flex;
  gap: 2px;
  align-items: flex-start;
}

#key-prompt .group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
}

#key-prompt .v-enter-active {
  transition: opacity 0.5s ease;
}

#key-prompt .v-leave-active {
  transition: all 0.5s ease;
  transform: translateX(-100%);
}

#key-prompt .v-enter-from,
#key-prompt .v-leave-to {
  opacity: 0;
}
`

export default css