<template>
  <q-page>
    <q-banner>
      <img src="https://picsum.photos/id/237/1200/300" alt="Banner Image" />
    </q-banner>

    <q-avatar size="100" src="https://picsum.photos/id/1011/100/100" />

    <q-card>
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label lines="1">John Doe</q-item-label>
            <q-item-label caption lines="1">Software Engineer</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-separator />

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label lines="1">Email:</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">johndoe@example.com</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label lines="1">Phone:</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">+1 555-123-4567</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label lines="1">Location:</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">New York, NY</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label lines="3"
            >This is my first post. Hello world!</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>April 15, 2023</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label lines="3"
            >Here's another post. Quasar is awesome!</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>April 16, 2023</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script lang="ts" setup></script>
