# prologue-front

[[_TOC_]]

--- 

> Prologue 프론트를 정의한 라이브러리형 프로젝트입니다.  
> Naraway v3 기반의 프로젝트로 `vite`, `storybook` 모듈로 구성되어 있습니다.  
> Drama의 `api`, `statekeeper`, `view` 등은 `lib` 하위에 위치합니다.

## 1. Publish and release

### 1-1. Publish

> publils는 `yarn publis-local` 스크립트를 이용합니다.  
> 빌드 후 로컬에서 npm repository로 publish가 수행됩니다.

### 1-2. Release

> 서버 release를 위해서는 로컬에서 publish후 변경된 `package.json`의 `prerelease` 버전을 하나 증가해 커밋합니다.  
> 서버에서 main(master) 브랜치를 release 브랜치에 MR(Merge request) 합니다.

## 2. Script

### 2-1. Storybook

`storybook`, `build-storybook`

> 로컬에서 컴포넌트를 테스트하기위한 storybook을 구동합니다.  
> 또는 서버에 배포하기위한 storybook을 빌드합니다.

```shell
# storybook
npm run storybook
# or
yarn storybook

# build storybook
npm run build-storybook
# or
yarn storbuild-storybookybook
```

### 2-2. Build & publish

`build`, `publish-local`

> 다른 front에서 사용하기위한 모듈 방식으로 빌드합니다.  
> `publish-local`의 경우 `build`가 먼저 수행됩니다.

```shell
# build
npm run build
# or
yarn build

# publish-local
npm run publish-local
# or
yarn publish-local
```

### 2-3. ES lint

`lint`, `lint-fix`

> ES lint 체크 및 자동 교정될 수 있는 코드를 일괄로 변경합니다.

```shell
# lint check
npm run lint
# or
yarn lint

# lint fix
npm run lint-fix
# or
yarn lint-fix
```

### 2-4. Update nara module version

`nara-update`, `nara-upgrade`

> Nara 관련 모듈의 버전을 확인해보거나 최신 버전으로 변경합니다.  
> 변경하면 `package.json`에 반영됩니다.

```shell
# nara update check
npm run nara-update
# or
yarn nara-update

# nara module upgrade
npm run nara-upgrade
# or
yarn nara-upgrade
```
