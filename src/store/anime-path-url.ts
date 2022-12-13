import { defineStore } from 'pinia'

import { useGetAnimePathUrl } from '../composables/use-get-anime-file-url'

import { useLocalAliasStore } from './local-alias'

export const useAnimePathUrlStore = defineStore('animeFileUrl', () => {
  const { getAlias } = useLocalAliasStore()

  const getAnimePathUrl = async () => (await useGetAnimePathUrl(getAlias())).value

  return {
    getAnimePathUrl,
  }
})
